<template>
  <div v-if="total !== 0 && totalPages !== 1" class="paginator">

    <!-- @slot Elements passed to this slot will appear before the controls. -->
    <slot name="before" />

    <template v-if="currentPage !== 0">
      <!-- 
        @slot The left-most control element which will navigate to the first page.
          @binding {func} increment-page Passes the [incrementPage](/zero-core/components/paginator#incrementpage) method. The first argument of which should be set to 'first'.
      -->
      <slot name="first" :increment-page="incrementPage" />
      <!-- 
        @slot The 2nd from the left control element which will navigate to the previous page.
          @binding {func} increment-page Passes the [incrementPage](/zero-core/components/paginator#incrementpage) method. The first argument of which should be set to 'prev'.
      -->
      <slot name="prev" :increment-page="incrementPage" />
      <!-- @slot A breaker element to insert between left controls and page numbers. -->
      <slot name="breaker-left" />
    </template>

    <template v-for="page in pages">
      <!-- 
        @slot An array of elements, each of which will navigate to a specific page determined by their page binding. Elements are generated from the pages computed property.
          @binding {object} page An object containing data about the page that this element will navigate to when clicked.
          @binding {func} increment-page Passes the [incrementPage](/zero-core/components/paginator#incrementpage) method. The first argument should be omitted and the page number from the page object binding above should be passed as the second argument instead.
      -->
      <slot
        v-if="page.display"
        name="page"
        :page="page"
        :increment-page="incrementPage" />
    </template>

    <template v-if="currentPage !== totalPages - 1">
      <!-- @slot A breaker element to insert between page numbers and right controls. -->
      <slot name="breaker-right" />
      <!-- 
        @slot The 2nd from the right control element which will navigate to the next page.
          @binding {func} increment-page Passes the [incrementPage](/zero-core/components/paginator#incrementpage) method. The first argument of which should be set to 'next'.
      -->
      <slot name="next" :increment-page="incrementPage" />
      <!-- 
        @slot The right-most control element which will navigate to the last page.
          @binding {func} increment-page Passes the [incrementPage](/zero-core/components/paginator#incrementpage) method. The first argument of which should be set to 'last'.
      -->
      <slot name="last" :increment-page="incrementPage" />
    </template>

    <!-- @slot Elements passed to this slot will appear after the controls. -->
    <slot name="after" />

  </div>
</template>

<script setup>
/**
 * @description A pagination component that automatically divides up an array of elements into paginated results or pages. It offers a control interface to navigate between pages of results.
 */
// ================================================================ Setup & Data
const props = defineProps({
  /**
   * The number of pages on either side of the current page to display as options to navigate to in the controls.
   */
  buffer: {
    type: Number,
    required: false,
    default: 2
  },
  /**
   * The number of elements shown per page.
   */
  limit: {
    type: Number,
    required: true
  },
  /**
   * The index of the first pagination element that appears on the current page. The [current page](/zero-core/components/paginator#currentpage) will be computed automatically based on this index.
   */
  offset: {
    type: Number,
    required: true
  },
  /**
   * The total number of elements to paginate.
   */
  total: {
    type: Number,
    required: true
  }
})

const emit = defineEmits([
  /**
   * Emits an object containing the page number to display in the UI (`page` property) and the index (`offset` property) of the first pagination element on the selected page. This index is used internally by this component to compute the [current page](/zero-core/components/paginator#currentpage).
   * @returns {{ page: number, offset: number }}
   */
  'pageIncremented'
])

// ==================================================================== Computed

/**
 * @method currentPage
 * @computed
 * @desc - The current page number. Computed using the offset prop divided by the results per page (limit prop).
 * @returns {number}
 */
const currentPage = computed(() => props.offset / props.limit)

/**
 * @method totalPages
 * @computed
 * @desc - The total number of pages in the paginated list.
 * @returns {number}
 */
const totalPages = computed(() => Math.ceil(props.total / props.limit))

/**
 * @method pages
 * @computed
 * @desc - An array of objects containing data about every single page in the paginated list. Each object has three properties: <ul><li>`display`; A boolean indicating if the control for this page should be displayed</li><li>`value`; The page number</li><li>`current`; A boolean indicating if this page is currently selected</li></ul>.
 * @returns {[Object]}
 */
const pages = computed(() => {
  const pages = totalPages.value
  const current = currentPage.value
  const buffer = props.buffer
  const compiled = []
  for (let i = 0; i < pages; i++) {
    compiled.push({
      value: i,
      display: i >= current - buffer - 1 && i <= current + buffer - 1,
      current: i === current
    })
  }
  return compiled
})

/**
 * @method incrementPage
 * @desc - Initiates a change in page and emits the new page value with the [pageIncremented](/zero-core/components/paginator#emitters) emitter.
 * @param {string|null} action If provided, must be one of `first`, `prev`, `next` or `last`, otherwise, the second argument, `page` will take precedent.
 * @param {number|undefined} page If provided and a valid action is not, the current page will be updated to this value.
 */
const incrementPage = (action, page) => {
  switch (action) {
    case 'first' : page = 0; break
    case 'prev' : page = currentPage.value - 1; break
    case 'next' : page = currentPage.value + 1; break
    case 'last' : page = totalPages.value - 1; break
  }
  if (currentPage.value !== page) {
    emit('pageIncremented', {
      page: page + 1,
      offset: page * props.limit
    })
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.paginator {
  display: flex;
  flex-direction: row;
}
</style>
