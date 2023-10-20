<template>
  <div
    :class="['slider-panel', { animate }]"
    :style="getSlideStyles()">

    <slot name="panel-content" />

  </div>
</template>

<script setup>
import { storeToRefs } from "pinia"

// ======================================================================= Props
const props = defineProps({
  sliderId: {
    type: String,
    required: true
  },
  panelIndex: {
    type: Number,
    required: true
  }
})
// ======================================================================= Setup
const sliderStore = useZeroSliderStore()
const { sliders } = storeToRefs(sliderStore)

// ======================================================================== Data

// ==================================================================== Computed
const slider = computed(() => sliders.value[props.sliderId] ? sliders.value[props.sliderId] : false)
const panelPositions = computed(() => slider ? slider.value.panelPositions : false)
const animatedPanels = computed(() => slider ? slider.value.animatedPanels : false)
const displayOptions = computed(() => slider ? slider.value.displayOptions : false)

const animate = computed(() => animatedPanels.value ? animatedPanels.value.includes(props.panelIndex) : false)

// ======================================================================= Hooks

// ===================================================================== Methods
/**
 * @method getSlideStyles
 */
const getSlideStyles =  () => {
  if (!panelPositions.value) { return false }
  const position = panelPositions.value.indexOf(props.panelIndex)
  const transform = `translateX(${(position - 1) * 100}%)`
  const width = `${100 / displayOptions.value.default}%`
  const styles = { transform, width }
  return styles
}

</script>

<style lang="scss" scoped>
.slider-panel {
  flex: 1;
  width: 100%;
  &.animate {
    transition: transform 500ms ease;
  }
}

</style>
