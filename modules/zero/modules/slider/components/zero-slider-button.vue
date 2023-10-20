<template>
  <div class="slider-button" @click="changePanel($event, props.direction)">

    <slot name="button-content" />

  </div>
</template>
<script setup>
// ===================================================================== Imports
import { storeToRefs } from 'pinia'

// ======================================================================= Props
const props = defineProps({
  sliderId: {
    type: String,
    required: true
  },
  direction: {
    type: String, // 'previous' or 'next'
    required: true
  }
})

// ======================================================================= Setup
const sliderStore = useZeroSliderStore()
const { sliders } = storeToRefs(sliderStore)

// ==================================================================== Computed
const slider = computed(() => sliders.value[props.sliderId] ? sliders.value[props.sliderId] : false)
const panelPositions = computed(() => slider ? slider.value.panelPositions : false)
const displayOptions = computed(() => slider ? slider.value.displayOptions : false)

// ===================================================================== Methods
/**
 * @method calculateAnimatedPanels
 */
const calculateAnimatedPanels = (direction) => {
  const defaultDisplay = displayOptions.value.default
  let animatedPanels
  switch(direction) {
    case 'previous':
      animatedPanels = [...panelPositions.value].slice(0, defaultDisplay + 1)
      break
    case 'next':
      animatedPanels = [...panelPositions.value].slice(1, defaultDisplay + 2)
  }
  return animatedPanels
}
/**
 * @method changePanel
 */
const changePanel = (e, direction) => {
  e.stopPropagation()
  const updatedPositions = [...panelPositions.value]
  if (direction === 'previous') {
    updatedPositions.unshift(updatedPositions.pop())
  } else if (direction === 'next') {
    updatedPositions.push(updatedPositions.shift())
  }
  sliderStore.updateSlider({
    sliderId: props.sliderId,
    panelPositions: updatedPositions,
    currentPanel: useCalculateCurrentPanel(displayOptions.value.default, updatedPositions),
    animatedPanels: calculateAnimatedPanels(direction)
  })
}
</script>
<style lang="scss" scoped>
.slider-button {
  cursor: pointer;
}
</style>
