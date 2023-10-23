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
  displayOptions: {
    type: Object,
    required: false,
    default: () => {
        return { default: 1 }
      }
  }
})

// ======================================================================= Setup
const sliderStore = useZeroSliderStore()
const slots = useSlots()
const { sliders } = storeToRefs(sliderStore)

// ======================================================================== Data
const localId = ref(useUuid().v4())
const track = ref(null)
const height = ref(false)
const resizeObserver = ref(null)
const resize = ref(null)

// ==================================================================== Computed
const id = computed(() => { return `${props.sliderId}|${localId.value}` })
const slider = computed(() => sliders.value[props.sliderId] ? sliders.value[props.sliderId] : false)
const currentPanel = computed(() => slider.value ? slider.value.currentPanel : false)
const breakpoints = computed(() => {
  const data = {}
  data.default = props.displayOptions.default
  if (props.displayOptions.hasOwnProperty('ultralarge')) { data['140.625rem'] = props.displayOptions.ultralarge }
  if (props.displayOptions.hasOwnProperty('xlarge')) { data['90rem'] = props.displayOptions.xlarge }
  if (props.displayOptions.hasOwnProperty('large')) { data['85rem'] = props.displayOptions.large }
  if (props.displayOptions.hasOwnProperty('medium')) { data['64rem'] = props.displayOptions.medium }
  if (props.displayOptions.hasOwnProperty('small')) { data['53.125rem'] = props.displayOptions.small }
  if (props.displayOptions.hasOwnProperty('mini')) { data['40rem'] = props.displayOptions.mini }
  if (props.displayOptions.hasOwnProperty('tiny')) { data['25.9375rem'] = props.displayOptions.tiny }
  return data
})
const display = computed(() => slider.value ? slider.value.display : matchBreakpointDisplayAmount())
const panelCount = ref(slots.panels()[0].children.length)


// ======================================================================= Hooks
onMounted(async () => {
  const panelPositions = [...Array(panelCount.value).keys()].map(el => (el + currentPanel.value + panelCount.value - 1) % panelCount.value)
  sliderStore.setSlider({
    id: id.value,
    sliderId: props.sliderId,
    currentPanel: currentPanel.value || useCalculateCurrentPanel(props.displayOptions.default, panelPositions),
    panelCount: panelCount.value,
    panelPositions,
    animatedPanels: [],
    display: display.value
  })
   await nextTick(() => {
    setHeight()
    resize.value = useThrottle(resizeFunctions, 200)
    resizeObserver.value = new ResizeObserver(resize.value)
    resizeObserver.value.observe(track.value)
  })
})

onBeforeUnmount (() => {
  sliderStore.removeSlider(props.sliderId)
  resizeObserver.value.disconnect()
})

// ===================================================================== Methods
/**
 * @method setHeight
 */
const resizeFunctions = () => {
  nextTick(() => {
    setHeight()
    sliderStore.updateSlider({
      sliderId: props.sliderId,
      display: matchBreakpointDisplayAmount()
    })
  })
}
/**
 * @method setHeight
 */
const setHeight = () => {
  // track.value.children[currentPanel.value] is the currently visible/central panel DOM element
  height.value = `${track.value.children[currentPanel.value].clientHeight}px`
}
/**
 * @method matchBreakpointDisplayAmount
 */
const matchBreakpointDisplayAmount = () => {
  let updatedDisplay
  let reset = true
  for (const breakpoint in breakpoints.value) {
    if (window.matchMedia(`(max-width: ${breakpoint})`).matches) {
      if (reset) { reset = false}
      updatedDisplay = breakpoints.value[breakpoint]
    }
  }
  if (reset) {
    updatedDisplay = breakpoints.value.default
  }
  return updatedDisplay
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
