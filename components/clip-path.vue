<template>
  <div class="container">

    <div ref="svgSlot" class="svg-slot">

      <slot name="svg-path"></slot>

    </div>

    <svg class="svg-clip-path">
      <defs>
        <clipPath
          v-if="path"
          :id="`clip-path-${clipPathElementId}`"
          clipPathUnits="objectBoundingBox"
          :transform="`scale(${1 / svgPathData.rangeX} ${1 / (svgPathData.rangeY)})`">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            :d="path"
            fill="none" />
        </clipPath>
      </defs>
    </svg>

    <div
      class="clip-wrapper"
      :style="wrapper">
      <div
        :class="['clipped-content', anchor]"
        :style="{ width: `${dimensions.w}px`, height: `${dimensions.h}px`, clipPath: `url(#clip-path-${clipPathElementId})` }">
        
        <slot name="clipped-content"></slot>

      </div>
    </div>

  </div>
</template>

<script setup>
// ====================================================================== Import
import { useSvgPathData } from '../modules/zero/modules/kitchen-sink/composables/use-svg-path-data.js'

// ======================================================================= Props
const props = defineProps({
  targetContentWidth: {
    type: Number,
    required: false,
    default: 0
  },
  targetContentHeight: {
    type: Number,
    required: false,
    default: 0
  },
  anchorType: {
    type: String,
    required: false,
    default: 'center'
  },
  anchorPosition: {
    type: Number,
    required: false,
    default: 1
  },
  borderRadius: {
    type: Number,
    required: false,
    default: 0
  },
  mirrorDimensions: {
    type: Function,
    required: false,
    default: () => null
  }
})

// ======================================================================== Data
const clipPathElementId = ref(useUuid().v4())
const svgSlot = ref(null)
const path = ref('')
const width = ref(0)
const height = ref(0)
const resizeEventListener = ref(false)

// ==================================================================== Computed
const svgPathData = computed(() => path.value ? useSvgPathData(path.value) : { rangeX: 1, rangeY: 1 })
const anchor = computed(() => `${props.anchorType}-${props.anchorPosition}`)
const wrapper = computed(() => props.borderRadius ? { borderRadius: `${props.borderRadius}px` } : null)
const scaleX = computed(() => width.value ? (width.value / svgPathData.value.rangeX) : 1)
const scaleY = computed(() => height.value ? (height.value / svgPathData.value.rangeY) : 1)
const dimensions = computed(() => {
  const dim = {
    w: svgPathData.value.rangeX * scaleX.value,
    h: svgPathData.value.rangeY * scaleY.value
  }
  return typeof dim.w === 'number' && typeof dim.h === 'number' ? dim : { w: 1, h: 1 }
})

// ======================================================================= Hooks
onMounted(() => {
  path.value = findPathElement()
  if (props.targetContentWidth) {
    width.value = props.targetContentWidth
  }
  if (props.targetContentHeight) {
    height.value = props.targetContentHeight
  }
  if (props.mirrorDimensions()) {
    resizeDimensions()
    resizeEventListener.value = () => { resizeDimensions() }
    window.addEventListener('resize', resizeEventListener.value)
  }
})

onBeforeUnmount(() => {
  if (resizeEventListener.value) {
    window.removeEventListener('resize', resizeEventListener.value)
  }
})

// ===================================================================== Methods
const findPathElement = () => {
  const slot = svgSlot.value
  if (slot) {
    const pathEl = slot.querySelector('path')
    if (pathEl) {
      return pathEl.getAttribute('d')
    }
  }
  return null
}

const resizeDimensions = () => {
  const mirror = props.mirrorDimensions()
  const rect = mirror.getBoundingClientRect()
  if (!props.targetContentWidth) {
    width.value = rect.width
  }
  if (!props.targetContentHeight) {
    height.value = rect.height
  }
}

</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.container {
  position: relative;
}

.container,
.clip-wrapper {
  width: 100%;
  height: 100%;
}

.clip-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}

.svg-slot,
.svg-clip-path {
  position: absolute;
  top: -9999px;
  left: -9999px;
  width: 0;
  height: 0;
}

.clipped-content {
  position: absolute;
  &.center-1 {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  &.center-2 {
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  &.center-3 {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  &.center-4 {
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  &.corner-1 {
    left: 0;
    top: 0;
  }
  &.corner-2 {
    right: 0;
    top: 0;
  }
  &.corner-3 {
    right: 0;
    bottom: 0;
  }
  &.corner-4 {
    left: 0;
    bottom: 0;
  }
}
</style>