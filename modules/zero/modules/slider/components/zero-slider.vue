<template>
  <div class="slider">
    <div class="track-wrapper" :style="{ width, transform, height }">

      <renderedTrack />

    </div>
  </div>
</template>

<script setup>
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

// ======================================================================== Data
const track = ref(null)
const currentPanel = ref(false)
const slidesRef = ref(slots.default()[0].children)
const panelCount = ref(slidesRef.value.length)

const localId = ref(useUuid().v4())
const height = ref(false)
const transitionend = ref(false)

// ==================================================================== Computed
const id = computed(() => { return `${props.sliderId}|${localId.value}` })
const width = computed(() => { return `${panelCount.value * 100}%` })
const transform = computed(() => { return `translateX(-${currentPanel.value * 50}%)` })

const renderedTrack = computed(() => { return h('div', { class:'track', ref: 'track' }, slots.default()) })

// ==================================================================== Watchers
// watch(currentPanel, () => {
//     setHeight()
// })

// ======================================================================= Hooks
onMounted(async () => {
  const startPanelIndex = props.startPanelIndex
  if (startPanelIndex < 0) {
    throw new Error(`The start panel index cannot be a negative number. You supplied a value of ${startPanelIndex}`)
  }
  if (startPanelIndex > panelCount - 1) {
    throw new Error(`You entered a start panel index (${startPanelIndex}) that is higher than the amount of panels available (${panelCount})`)
  }
  sliderStore.setSlider({
    id,
    sliderId: props.sliderId,
    currentPanel: props.startPanelIndex,
    panelCount
  })
  currentPanel.value = sliderStore.getSliderCurrentPanel(id)
  transitionend.value = (e) => {
    const propertyName = e.propertyName
    if (propertyName === 'height' || propertyName === 'transform') {
      $emit('sliderTransitionEnd')
    }
  }
  track.value.addEventListener('transitionend', transitionend)

  // setHeight()
})

onBeforeUnmount (() => {
  sliderStore.removeSlider(id)
  if (transitionend) { track.value.removeEventListener('transitionend', transitionend) }
})

// ===================================================================== Methods
/**
 * @method setHeight
 */
const setHeight = () => {
  nextTick(() => {
    console.log('height ', track.value.children[currentPanel.value].clientHeight)
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
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  overflow: hidden;
  transition: transform 150ms ease-in-out, height 150ms ease-in-out;
}

:deep(.slider-panel) {
  flex: 1;
}
</style>
