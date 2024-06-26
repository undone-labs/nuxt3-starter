<template>
  <main class="page">

    <!-- ============================================================ Header -->
    <header>
      <div class="grid">
        <div class="col-6_md-8" data-push-left="off-2_lg-3_md-0">
          <div class="content">
            <h1
              :id="pageSlug"
              ref="heading"
              class="heading">
              {{ pageHeading }}
            </h1>
          </div>
        </div>
      </div>
    </header>

    <!-- ========================================================== Sections -->
    <section
      v-for="section in pageContent"
      :key="section._path"
      class="section">

      <div class="grid">

        <!-- ======================================================= Content -->
        <div class="col-6_md-8" data-push-left="off-2_lg-3_md-0">
          <div class="content">

            <ZeroMarkdownParser
              id="markdown"
              :markdown="section.raw"
              :section="content.length > 1 ? section._path.split('/').pop() : ''"
              class="markdown" />

            <ZeroApiOverview
              v-if="section.apiOverview"
              :headers="section.apiOverview.headers"
              :query-parameters="section.apiOverview.queryParameters"
              :body-parameters="section.apiOverview.bodyParameters"
              :path-parameters="section.apiOverview.pathParameters"
              :response-codes="section.apiOverview.responseCodes" />

              <component
              :is="getCustomComponentName(section._path)"
              v-if="getCustomComponentName(section._path)" />

          </div>
        </div>

        <!-- ======================================================= Preview -->
        <div class="col-4_lg-3_md-4">
          <div class="preview">

            <ZeroApiPreview
              v-if="section.apiPreview"
              :sliders="section.apiPreview.sliders" />

            <component
              :is="getPreviewComponentName(section._path)"
              v-if="getPreviewComponentName(section._path)" />

          </div>
        </div>

      </div>

    </section>

    <div class="grid">
      <div class="col-10" data-push-left="off-2">
        <Pagination />
      </div>
    </div>

  </main>
</template>

<script setup>
// ===================================================================== Imports
import StartCase from 'lodash/startCase'

// ======================================================================= Setup
definePageMeta({
  layout: 'docs'
})

// ======================================================================== Data
const { $seo } = useNuxtApp()
const intersectionObserver = ref(null)
const headerHeight = ref(0)
const sections = ref([])
const scrollWindowEventListenerFunction = ref(null)
const route = useRoute()
const navigatedByRoute = ref(false)
const navigatedByRouteDebounce = ref(null)
const ctx = getCurrentInstance()
const dirNameSplit = route.path.slice(1).split('/')
const docsStore = useZeroDocsStore()

const pageSlug = dirNameSplit[dirNameSplit.length - 1]
const pageHeading = useToPascalCase(pageSlug, ' ')

const { data: content } = await useAsyncData(`page-content-md-${route.path}`, async () => {
  const content = await queryContent({
    where: {
      _path: { $contains: `/docs${route.path}` }
    }
  }).find()
  return content.filter(file => file._extension === 'md')
}, { watch: [route] })

if (content.value.length === 0) {
  throw createError({
    statusCode: 404,
    message: 'Looks like the page you\'re looking for doesn\'t exist',
    fatal: true
  })
}

const { data: jsonContent } = await useAsyncData(`page-content-json-${route.path}`, async () => {
  const jsonContent = await queryContent({
    where: {
      _path: { $contains: `/docs${route.path}` }
    }
  }).find()
  return jsonContent.filter(file => file._extension === 'json')
}, { watch: [route] })

const { data: definitionsSchema } = await useAsyncData(`definitions-schema-${route.path}`, () => {
  return queryContent({
    where: {
      _path: { $contains: `/docs/${dirNameSplit[0]}/${dirNameSplit[1]}/definitions-schema` }
    }
  }).findOne()
}, { watch: [route] })

const pageContent = ref([])

// ======================================================================= Setup
$seo(
  '*',
  content.value.length === 1 ?
    content.value[0].frontmatter :
    content.value.find(item => item._file.includes('src.md')) || {}
)

// ==================================================================== Computed
const headerHeightOffset = computed(() => headerHeight.value * 3)

// ===================================================================== Methods
/**
 * @method generatePageContent
 */

const generatePageContent = () => {
  if (process.client) {
    docsStore.compileMagellanLinks([])
  }
  const array = content.value.filter(item => item._extension === 'md' && !item._file.includes('src.md'))
  array.forEach(mdContent => {
    docsStore.compileMagellanLinks([...mdContent.body.toc.links])
    const jsonData = jsonContent.value.find(item => item._path === mdContent._path)
    if (jsonData) {
      if (Object.hasOwn(jsonData, 'swagger')) {
        const { overview, preview } = useFormatSwaggerData(jsonData, {...definitionsSchema.value})

        mdContent.apiOverview = overview
        mdContent.apiPreview = preview
      } else {
        mdContent.apiPreview = jsonData
      }
    }
  })
  pageContent.value = array
}

/**
 * @method intersectionObserveHeadings
 * @see {@link https://www.smashingmagazine.com/2018/01/deferring-lazy-loading-intersection-observer-api/} for a thorough overview of how the IntersectionObserver works
 */
const intersectionObserveHeadings = () => {
  intersectionObserver.value = new IntersectionObserver((entries) => {
    const entry = entries[0]
    const entryId = entry.target.id
    const sectionId = entry.target.getAttribute('section')
    const intersectingTop = entry.boundingClientRect.top <= headerHeightOffset.value
    // const hash = window.location.hash.slice(1)
    // let activeSection = { id: entryId }
    // let activePath
    // console.log('→', entryId, route.path, intersectingTop, navigatedByRoute.value, entry.intersectionRatio, entry.isIntersecting)
    /**
     * While scrolling, update URL hash from DOM and use hash from DOM headings.
     * This does not fire if navigating via the magellan nav.
     */
    if (intersectingTop && !navigatedByRoute.value) {
      // console.log(entryId, sectionId)
      // console.log(entry)
      docsStore.setActiveSection(
        sectionId !== '' ? { id: entryId, sectionId } : { id: entryId }
      )
      // if (entryId !== hash) {
      //   // activePath = `${route.path}#${entryId}`
      //   // activeSection =
      //   // docsStore.setActiveSection(
      //   //   sectionId !== '' ? { id: entryId, sectionId } : { id: entryId }
      //   // )
      // } else {
      //   // const index = sections.value.findIndex(section => section.id === entryId)
      //   // if (index !== 0) {
      //   //   const current = sections.value[index - 1]
      //   //   activePath = `${route.path}#${current.id}`
      //   //   activeSection = current.id
      //   // } else {
      //   //   activeSection = false
      //   // }
      //   // docsStore.setActiveSection(activeSection)
      // }
    }
    // if (!navigatedByRoute.value && !intersectingTop && activeSection) {
    //   history.replaceState({}, null, activePath)
    // }
  }, {
    rootMargin: `${-headerHeightOffset.value}px 0px 0px 0px`
  })
  sections.value.forEach((section) => {
    intersectionObserver.value.observe(section)
  })
}

/**
 * @method detectPageScrolledToEdgesOfViewport
 */
const detectPageScrolledToEdgesOfViewport = () => {
  if (sections.value.length) {
    const lastMagellanNavItem = sections.value.slice(-1).pop()
    const lastMagellanNavItemId = lastMagellanNavItem.id
    const lastMagellanNavItemSectionId = lastMagellanNavItem.getAttribute('section')
    const scrollHandler = () => {
      const y = window.scrollY
      const viewportHeight = window.innerHeight
      const bodyHeight = document.body.offsetHeight
      if (y <= headerHeight.value) {
        // history.replaceState({}, null, route.path)
        // docsStore.setActiveSection(false)
      } else if (y + viewportHeight >= bodyHeight) {
        // history.replaceState({}, null, `${route.path}#${lastMagellanNavItemId}`)
        docsStore.setActiveSection(
          lastMagellanNavItemSectionId !== '' ?
            { id: lastMagellanNavItemId, sectionId: lastMagellanNavItemSectionId } :
            { id: lastMagellanNavItemId }
        )
      }
    }
    scrollWindowEventListenerFunction.value = zeroThrottle(scrollHandler, 100)
    window.addEventListener('scroll', scrollWindowEventListenerFunction.value)
  }
}

/**
 * @method getPreviewComponentName
 */
const getPreviewComponentName = path => {
  const componentList = ctx.appContext.components
  const previewComponentName = `Preview ${StartCase(path.replace('/docs/', '').replaceAll('/', '-'))}`.replaceAll(' ', '')
  const previewExists = componentList.hasOwnProperty(previewComponentName)
  if (previewExists) { return previewComponentName }
  return false
}


/**
 * @method getCustomComponentName
 */
const getCustomComponentName = path => {
  const componentList = ctx.appContext.components
  const previewComponentName = useToPascalCase(path.split('/').pop())
  const previewExists = componentList.hasOwnProperty(previewComponentName)
  if (previewExists) { return previewComponentName }
  return false
}

// ==================================================================== Watchers
watch(route, async route => {
  generatePageContent()
  if (navigatedByRouteDebounce.value) { clearTimeout(navigatedByRouteDebounce.value) }
  navigatedByRouteDebounce.value = setTimeout(() => {
    navigatedByRoute.value = false
    clearTimeout(navigatedByRouteDebounce.value)
  }, 100)
  navigatedByRoute.value = true
  docsStore.setActiveSection({ id: route.hash.slice(1) })
}, { immediate: true })

// ======================================================================= Hooks
onMounted(async () => {
  // Need the following line for HMR to play nice with @nuxt/content module due to the following issue: https://github.com/nuxt/content/issues/1799
  await new Promise((resolve) => setTimeout(resolve))
  await nextTick(() => {
    const header = document.getElementById('site-header')
    headerHeight.value = header.offsetHeight
    sections.value = Array.from(document.querySelectorAll('#markdown *[id]'))
    intersectionObserveHeadings()
    detectPageScrolledToEdgesOfViewport()
  })
})

onBeforeUnmount(() => {
  sections.value.forEach((section) => {
    intersectionObserver.value.unobserve(section)
  })
  window.removeEventListener('scroll', scrollWindowEventListenerFunction.value)
})
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// Content
.page {
  padding-bottom: 5rem;
}

.content,
.preview {
  padding: 0 2rem 0 2rem;
  @include gridMaxMQ {
    padding-left: 0;
  }
}

:deep(.markdown) {
  h2, h3, h4, h5, h6 {
    position: sticky;
    top: calc(#{$siteHeaderHeight} + 1.75rem);
    scroll-margin-top: calc(#{$siteHeaderHeight} + 1.75rem);
  }
  @include customMaxMQ(toRem(1366)) {
    padding-left: 2rem;
  }
  @include large {
    padding-left: 0;
  }
}

.section {
  &:not(:nth-child(2)) {
    padding-top: 2rem;
    border-top: solid 2px var(--background-color__secondary);
    transition: border-color 500ms;
  }
  &:not(:nth-last-child(2)) {
    padding-bottom: 2rem;
  }
}

.preview {
  position: sticky;
  top: calc(#{$siteHeaderHeight} + 1rem);
  @include gridMaxMQ {
    padding-right: 0;
  }
}

.heading {
  @include h1;
  margin-bottom: 2rem;
}
</style>
