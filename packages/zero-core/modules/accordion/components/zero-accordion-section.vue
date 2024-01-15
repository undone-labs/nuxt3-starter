<template>
  <div
    :class="['accordion-section', { open }]"
    tabindex="0"
    @click="toggleSection"
    @keydown.enter="toggleSection">

    <div
      ref="header"
      :class="['accordion-header', { open }]">
      <slot name="header" />

    </div>

    <div ref="content" :class="['accordion-content-wrapper', { open }]" :style="{ height }">
      <!-- content slot requires a single root HTML element to animate correctly -->
      <slot name="content" />
    </div>

  </div>
</template>

<script setup>
// ===================================================================== Imports
import { storeToRefs } from 'pinia'

// ======================================================================= Props
const props = defineProps({
  accordionId: {
    type: String,
    required: true
  }
})

// ======================================================================= Setup
const instance  = getCurrentInstance()
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
const accordion = computed(() => accordions.value[props.accordionId])
const active = computed(() => accordion.value ? accordion.value.active : false)

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
 */
const toggleSection = () => {
  accordionStore.toggleAccordionSection(props.accordionId, sectionId.value)
}

/**
 * @method setHeight
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
