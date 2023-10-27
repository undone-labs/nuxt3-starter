<template>
  <div
    :class="['slider-panel', { animate }, { clickable: clickToCenter }]"
    :style="slideStyles"
    @click="panelClick()">

    <slot name="panel-content" />

  </div>
</template>

<script setup>
import { storeToRefs } from "pinia"
import { useCalculatePanelPositions } from "../composables/use-calculate-panel-positions";

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
// const emit = defineEmits(['clicked'])
const sliderStore = useZeroSliderStore()
const { sliders } = storeToRefs(sliderStore)

// ==================================================================== Computed
const slider = computed(() => sliders.value[props.sliderId] ? sliders.value[props.sliderId] : false)
const panelPositions = computed(() => slider.value.panelPositions )
const animatedPanels = computed(() => slider.value.animatedPanels)
const display = computed(() => slider.value.display)
const currentPanel = computed(() => slider.value.currentPanel)
const clickToCenter = computed(() => slider.value.clickToCenter)

const animate = computed(() => animatedPanels.value ? animatedPanels.value.includes(props.panelIndex) : false)

const slideStyles = computed(() => {
  if (!panelPositions.value) { return false }
  const position = panelPositions.value.indexOf(props.panelIndex)
  return {
    transform: `translateX(${(position - 1) * 100}%)`,
    width: `${100 / display.value}%`
  }
})

// ===================================================================== Methods
/**
 * @method calculateAnimatedPanels
 */
 const calculateAnimatedPanels = (updatedPositions) => {
  let animatedPanels
  const indexDifference = Math.abs(currentPanel.value - props.panelIndex)
  switch(true) {
    case (props.panelIndex < currentPanel.value):
      animatedPanels = [...updatedPositions].slice(1, display.value + indexDifference + 1)
      break
    case (props.panelIndex > currentPanel.value):
      animatedPanels = [...panelPositions.value].slice(1, display.value + indexDifference + 1)
      // panel(s) dissapearing from view (on left)need different styling applied
    }
  return animatedPanels
}
/**
 * @method panelClick
 */
const panelClick = () => {
  if (clickToCenter.value) {
    const updatedPositions = useCalculatePanelPositions(props.panelIndex, panelPositions.value, display.value)
    sliderStore.updateSlider({
      sliderId: props.sliderId,
      currentPanel: props.panelIndex,
      panelPositions: updatedPositions,
      animatedPanels: calculateAnimatedPanels(updatedPositions)
    })
  }
}

</script>

<style lang="scss" scoped>
.slider-panel {
  flex: 1;
  &.animate {
    transition: transform 500ms ease;
  }
  &.clickable {
    cursor: pointer;
  }
}

</style>
