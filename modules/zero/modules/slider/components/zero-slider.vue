<template>
  <div ref="track" class="slider" :style="{ height }">

    <slot name="panels" />

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
  startPanelIndex: {
    type: Number,
    required: false,
    default: 0
  }
})

// ======================================================================= Setup
const sliderStore = useZeroSliderStore()
const slots = useSlots()
const { sliders } = storeToRefs(sliderStore)

// ======================================================================== Data
const localId = ref(useUuid().v4())
const track = ref(null)
const slidesRef = ref(slots.panels()[0].children)

const height = ref(false)

// ==================================================================== Computed
const id = computed(() => { return `${props.sliderId}|${localId.value}` })
const slider = computed(() => sliders.value[props.sliderId] ? sliders.value[props.sliderId] : false)
const currentPanel = computed(() => slider.value ? slider.value.currentPanel : props.startPanelIndex)
const panelCount = computed(() => slidesRef.value.length)

// ======================================================================= Hooks
onMounted(() => {
  const startPanelIndex = props.startPanelIndex
  if (startPanelIndex < 0) {
    throw new Error(`The start panel index cannot be a negative number. You supplied a value of ${startPanelIndex}`)
  }
  if (startPanelIndex > panelCount - 1) {
    throw new Error(`You entered a start panel index (${startPanelIndex}) that is higher than the amount of panels available (${panelCount})`)
  }
  sliderStore.setSlider({
    id: id.value,
    sliderId: props.sliderId,
    currentPanel: startPanelIndex,
    panelCount: panelCount.value,
    panelPositions: [...Array(panelCount.value).keys()].map(el => (el + startPanelIndex + panelCount.value - 1) % panelCount.value),
    animatedPanels: []
  })
  setHeight()
})

onBeforeUnmount (() => {
  sliderStore.removeSlider(props.sliderId)
})

// ===================================================================== Methods
/**
 * @method setHeight
 */
const setHeight = () => {
  nextTick(() => {
    height.value = `${track.value.children[currentPanel.value].clientHeight}px`
  })
}

</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.slider {
  position: relative;
  overflow: hidden;
  width: 100%;
  transition: transform 150ms ease-in-out, height 150ms ease-in-out;
}

:deep(.slider-panel) {
  position: absolute;
  left: 0;
  top: 0;
  flex: 1;
  width: 100%;
}
</style>
