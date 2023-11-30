<template>
  <div class="layout default">

    <!-- <AlgoliaModal /> -->

    <SiteHeader />

    <Sidebar />

    <slot />

    <SiteFooter />

  </div>
</template>

<script setup>
// ======================================================================= Setup
if (process.client && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  useHead({
    meta: [
      { name: 'msapplication-config', content: '/public/favicon/light/browserconfig.xml' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/public/favicon/light/favicon-96x96.png' },
      { rel: 'manifest', href: '/public/favicon/light/manifest.json' }
    ]
  })
}
// ======================================================================== Data
const generalStore = useGeneralStore()
const { language } = storeToRefs(generalStore)

const { data: Settings } = await useAsyncData('settings', async () => {
  const content = await queryContent({
    where: {
      _file: { $contains: `data/${language.value}/settings.json` }
    }
  }).find()
  return content.pop()
  },
  {
    watch: [language]
  }
)

generalStore.setSettings(Settings.value)

// ======================================================================= Hooks
onMounted(() => {
  const initialTheme = localStorage.getItem('theme')
  if (initialTheme) {
    generalStore.setTheme(initialTheme)
  }
  const initialLanguage = localStorage.getItem('language')
  if (initialLanguage) {
    generalStore.setLanguage(initialLanguage)
  }
})
</script>
