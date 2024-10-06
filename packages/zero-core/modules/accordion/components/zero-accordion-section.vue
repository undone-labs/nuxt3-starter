<template>
  <div
    :class="['accordion-section', { open }]"
    tabindex="0">

    <div
      ref="header"
      :class="['accordion-header', { open }]"
      @click="toggleSection"
      @keydown.enter="toggleSection">
      <!-- @slot Header content for each section. This content is wrapped in a clickable div when will toggle the section's expanded state. -->
      <slot name="header" />

    </div>

    <div ref="content" :class="['accordion-content-wrapper', { open }]" :style="{ height }">
      <!-- @slot Collapsible content for each section. The content slot requires a single root HTML element to animate correctly. -->
      <slot name="content" />
    </div>

  </div>
</template>

<script setup>
/**
 * @description A single accordion section comprised of a header and content that expands and collapses when the header is clicked.
 */
// ===================================================================== Imports
import { storeToRefs } from 'pinia'

// ======================================================================= Props
const props = defineProps({
  /**
   * The ID of this section's parent accordion.
   */
  accordionId: {
    type: String,
    required: true
  }
})

// ======================================================================= Setup
const instance = getCurrentInstance()
const accordionStore = useZeroAccordionStore()

// ======================================================================== Data
const sectionId = ref(instance.uid)
const { accordions } = storeToRefs(accordionStore)
const height = ref('0px')
const header = ref(null)
const content = ref(null)
const resize = ref(false)
const resizeObserver = ref(false)

// ==================================================================== Computed
/**
 * @method accordion
 * @computed
 * @desc Returns the parent accordion of this section from the [accordions](/zero-core/modules/accordion/store#accordions) array in the accordion store.
 * @returns {Object}
 */
const accordion = computed(() => accordions.value[props.accordionId])

/**
 * @method active
 * @computed
 * @desc Returns an array of active sections in this [accordion](/zero-core/modules/accordion/components#zero-accordion). Each section is referenced by a Unique ID set from `instance.uid` where instance is given by the `getCurrentInstance()` composable.
 * @returns {[number]}
 */
const active = computed(() => accordion.value ? accordion.value.active : false)

/**
 * @method open
 * @computed
 * @desc Returns the open/expanded state of this section as a boolean; true for open, false for closed.
 * @returns {boolean}
 */
const open = computed(() => {
  if (Array.isArray(active.value)) {
    return active.value.includes(sectionId.value)
  }
  return active.value === sectionId.value
})

// ======================================================================= Watch
watch(open, () => {
  setHeight()
})

// ======================================================================= Hooks
onMounted(() => {
  accordionStore.setAccordionSection(props.accordionId, sectionId.value)
  nextTick(() => {
    resize.value = zeroThrottle(() => {
      setHeight()
    }, 100)
    resizeObserver.value = new ResizeObserver(resize.value)
    resizeObserver.value.observe(header.value)
  })
})

onBeforeUnmount(() => {
  resizeObserver.value.disconnect()
})

// ===================================================================== Methods
/**
 * @method toggle
 * @desc Toggles the expanded state of this section using the accordion store's [toggleAccordionSection](/zero-core/modules/accordion/store#toggleaccordionsection) method.
 */
const toggleSection = () => {
  accordionStore.toggleAccordionSection(props.accordionId, sectionId.value)
}

/**
 * @method setHeight
 * @desc Calculates and sets the height of the accordion section content. Called every time the [open](/zero-core/modules/accordion/components#open) state changes using a watcher.
 */
const setHeight = () => {
  if (open.value) {
    const contentHeight = `${content.value.children[0].clientHeight}px`
    if (height.value !== contentHeight) {
      height.value = contentHeight
    }
  } else {
    height.value = '0px'
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.accordion-section {
  position: relative;
  overflow: hidden;
}

.accordion-content-wrapper {
  transition: height 150ms ease-in-out;
}
</style>
