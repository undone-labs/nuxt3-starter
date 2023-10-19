<template>
  <div class="slider">

    <div
      ref="track"
      :style="{ height }"
      class="track">


      <slot name="panels" />

    </div>

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
const panelCount = computed(() => slidesRef.value.length)
const currentPanel = computed(() => slider.currentPanel ? slider.currentPanel : props.startPanelIndex)

// ==================================================================== Watchers
// watch(currentPanel, () => {
//     setHeight()
// })

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
    currentPanel: props.startPanelIndex,
    panelCount: panelCount.value,
    panelPositions: [...Array(panelCount.value).keys()]
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
  overflow: hidden;
}

.track {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
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
