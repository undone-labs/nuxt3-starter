<template>
  <ZeroButton
    :loader="id"
    class="slider-button"
    @click="changePanel($event, props.direction)">

    <slot name="button-content" />

  </ZeroButton>
</template>
<script setup>
// ===================================================================== Imports
import { storeToRefs } from 'pinia'
import { useCalculateCurrentPanelIndex } from '../composables/use-calculate-current-panel-index';

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
const buttonStore = useZeroButtonStore()
const id = `${props.sliderId}${props.direction[0].toUpperCase()}${props.direction.slice(1)}Button`

// ======================================================================== Data
const { sliders } = storeToRefs(sliderStore)

// ==================================================================== Computed
const slider = computed(() => sliders.value[props.sliderId] ? sliders.value[props.sliderId] : false)
const panelPositions = computed(() => slider ? slider.value.panelPositions : false)
const display = computed(() => slider ? slider.value.display : false)

// ===================================================================== Methods
/**
 * @method changePanel
 */
const changePanel = (e, direction) => {
  e.stopPropagation()
  const updatedPositions = [...panelPositions.value]
  const currentPanelIndex = useCalculateCurrentPanelIndex(display.value)
  let animatedPanels
  if (direction === 'previous') {
    updatedPositions.unshift(updatedPositions.pop())
    animatedPanels = useCalculateAnimatedPanels(panelPositions.value[currentPanelIndex - 1], panelPositions.value, display.value)
  } else if (direction === 'next') {
    updatedPositions.push(updatedPositions.shift())
    animatedPanels = useCalculateAnimatedPanels(panelPositions.value[currentPanelIndex + 1], panelPositions.value, display.value)
  }
  sliderStore.updateSlider({
    sliderId: props.sliderId,
    panelPositions: updatedPositions,
    currentPanel: updatedPositions[currentPanelIndex],
    animatedPanels
  })
  buttonStore.setButton({ id, loading: false })
}
</script>
<style lang="scss" scoped>
.slider-button {
  cursor: pointer;
}
</style>
