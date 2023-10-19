<template>
  <div class="slider-button" @click="changePanel($event, props.direction)">

    <slot #button-content />

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
const panelPositions = computed(() => slider.value ? slider.value.panelPositions : false)
const currentPanel = computed(() => slider.value ? slider.value.currentPanel : false)

// ===================================================================== Methods
/**
 * @method changePanel
 */
const changePanel = (e, direction) => {
  e.stopPropagation()
  const updatedPositions = [...panelPositions.value]
  const animatedPanels = [currentPanel.value]
  if (direction === 'previous') {
    animatedPanels.push(updatedPositions[0])
    updatedPositions.unshift(updatedPositions.pop())
  } else if (direction === 'next') {
    animatedPanels.push(updatedPositions[2])
    updatedPositions.push(updatedPositions.shift())
  }
  sliderStore.updateSlider({
    sliderId: props.sliderId,
    panelPositions: updatedPositions,
    currentPanel: updatedPositions[1],
    animatedPanels
  })
}
</script>
<style lang="scss" scoped>
.slider-button {
  cursor: pointer;
}
</style>
