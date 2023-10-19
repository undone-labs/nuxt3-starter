<template>
  <div
    class="slider-panel"
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

// ======================================================================= Hooks

// ===================================================================== Methods
/**
 * @method getSlideStyles
 */
const getSlideStyles =  () => {
  if (!panelPositions.value) { return false }
  const position = panelPositions.value.indexOf(props.panelIndex)
  const transform = `translateX(${position * 100}%)`
  const styles = { transform }
  return styles
}

</script>

<style lang="scss" scoped>
.slider-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 100%;
  transition: transform 250ms ease;
}

</style>
