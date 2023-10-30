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
  },
  clickToCenter: {
    type: Boolean,
    required: false,
    default: false
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
  for (const option in props.displayOptions) {
    if (panelCount.value < props.displayOptions[option] + 2) {
      throw new Error(`There aren't enough panels to display ${props.displayOptions[option]} panels at breakpoint ${option}.`)
    }
    if ((props.clickToCenter && panelCount.value < (props.displayOptions[option] * 2) - 1)) {
      throw new Error(`There aren't enough panels to animate panels clicking to center while displaying ${props.displayOptions[option]} panels at breakpoint ${option}. Reduce the number of displayed panels or disable clickToCenter.`)
    }
  }
  const panelArray = [...Array(panelCount.value).keys()].map(el => el)
  const panelPositions = useCalculatePanelPositions(0, panelArray, display.value)
  sliderStore.setSlider({
    id: id.value,
    sliderId: props.sliderId,
    display: display.value,
    currentPanel: currentPanel.value || panelPositions[useCalculateCurrentPanelIndex(display.value)],
    panelCount: panelCount.value,
    panelPositions,
    animatedPanels: [],
    clickToCenter: props.clickToCenter
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
