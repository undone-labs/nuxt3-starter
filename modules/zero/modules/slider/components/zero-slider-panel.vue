<template>
  <div
    :class="['slider-panel', { animate }]"
    :style="slideStyles">

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

// ==================================================================== Computed
const slider = computed(() => sliders.value[props.sliderId] ? sliders.value[props.sliderId] : false)
const panelPositions = computed(() => slider.value.panelPositions )
const animatedPanels = computed(() => slider.value.animatedPanels)
const display = computed(() => slider.value.display)

const animate = computed(() => animatedPanels.value ? animatedPanels.value.includes(props.panelIndex) : false)

const slideStyles = computed(() => {
  if (!panelPositions.value) { return false }
  const position = panelPositions.value.indexOf(props.panelIndex)
  return {
    transform: `translateX(${(position - 1) * 100}%)`,
    width: `${100 / display.value}%`
  }
})

</script>

<style lang="scss" scoped>
.slider-panel {
  flex: 1;
  &.animate {
    transition: transform 500ms ease;
  }
}

</style>
