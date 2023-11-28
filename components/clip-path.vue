<template>
  <div class="container">

    <slot name="svg-path"></slot>

    <svg class="svg-clip-path">
      <defs>
        <clipPath
          v-if="path"
          id="clip-path-element"
          clipPathUnits="objectBoundingBox"
          :transform="`scale(${1 / dimensions.w} ${1 / dimensions.h})`">
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
        :style="{ width: `${dimensions.w}px`, height: `${dimensions.h}px`}">
        <slot name="background"></slot>
      </div>
    </div>

    <slot name="foreground"></slot>

  </div>
</template>

<script setup>
// ====================================================================== Import
import { parseSVG, makeAbsolute } from 'svg-path-parser'

// ======================================================================= Props
const props = defineProps({
  targetWidth: {
    type: Number,
    required: false,
    default: 0
  },
  targetHeight: {
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
  }
})

const path = ref('')
const clipPathElementId = ref(useUuid().v4())
const instance = getCurrentInstance()

// ==================================================================== Computed
const parsed = computed(() => {
  const commands = parseSVG(path.value)
  makeAbsolute(commands)
  return commands
})

const xValues = computed(() => {
  return parsed.value.map(el => {
    const coords = []
    Object.keys(el).forEach((key) => {
      if (key.charAt(0) === 'x') {
        coords.push(el[key])
      }
    })
    return coords
  }).flat()
})

const yValues = computed(() => {
  return parsed.value.map(el => {
    const coords = []
    Object.keys(el).forEach((key) => {
      if (key.charAt(0) === 'y') {
        coords.push(el[key])
      }
    })
    return coords
  }).flat()
})

const bounds = computed(() => {
  return {
    minX: Math.min(...xValues.value),
    maxX: Math.max(...xValues.value),
    minY: Math.min(...yValues.value),
    maxY: Math.max(...yValues.value)
  }
})

const svgDimensions = computed(() => {
  const rX = Math.abs(bounds.value.maxX - bounds.value.minX)
  const rY = Math.abs(bounds.value.maxY - bounds.value.minY)
  return { rX, rY }
})

const anchor = computed(() => `${props.anchorType}-${props.anchorPosition}`)
const wrapper = computed(() => props.borderRadius ? { borderRadius: `${props.borderRadius}px` } : null)
const scaleX = computed(() => props.targetWidth ? (props.targetWidth / svgDimensions.value.rX) : 1)
const scaleY = computed(() => props.targetHeight ? (props.targetHeight / svgDimensions.value.rY) : 1)
const dimensions = computed(() => {
  const dim = {
    w: svgDimensions.value.rX * scaleX.value,
    h: svgDimensions.value.rY * scaleY.value
  }
  return typeof dim.w === 'number' && typeof dim.h === 'number' ? dim : { w: 1, h: 1 }
})

onMounted(() => {
  path.value = findPathElement()
})

const findPathElement = () => {
  const el = instance.subTree.children[0].children[0]?.el
  if (el) {
    const pathEl = el.nodeName.toLowerCase() === 'path' ? el : el.querySelector('path')
    if (pathEl) {
      return pathEl.getAttribute('d')
    }
  }
  return null
}
</script>

<style lang="scss" scoped>
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
  // border-radius: toRem(8);
}

.svg-clip-path {
  position: absolute;
  top: -9999px;
  left: -9999px;
  width: 0;
  height: 0;
}

.clipped-content {
  // --clip-path-id: '#clip-path-element';
  clip-path: url(#clip-path-element);
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