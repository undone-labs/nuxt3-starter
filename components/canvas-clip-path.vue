<template>
  <div ref="container" class="container canvas-clip-path">

    <svg class="svg-clip-path">
      <defs>
        <clipPath v-if="clipPath" :id="`clip-path-${clipPathElementId}`">
          <path clip-rule="evenodd" :d="clipPath" fill="none" />
        </clipPath>
      </defs>
    </svg>

    <div ref="svgSlot" class="svg-slot">
      <slot name="svg-path"></slot>
    </div>

    <div
      class="clipped-content"
      :style="{ width: `${clipPathData.rangeX}px`, height: `${clipPathData.rangeY}px`, clipPath: `url(#clip-path-${clipPathElementId})` }">
      <slot name="clipped-content"></slot>
    </div>

    <canvas v-if="props.displayGuides" ref="canvas"></canvas>

    <div class="overlay-content">
      <slot name="overlay-content"></slot>
    </div>

  </div>
</template>

<script setup>
// ====================================================================== Import
import { useSvgPathData } from '../modules/zero/modules/kitchen-sink/composables/use-svg-path-data.js'

// ======================================================================= Props
const props = defineProps({
  displayGuides: {
    type: Boolean,
    required: false,
    default: false
  },
  breakpointsX: {
    type: Array,
    required: false,
    default: () => []
  }
})
// ======================================================================== Data
const clipPathElementId = ref(useUuid().v4())
const svgSlot = ref(null)
const originalPath = ref('')
const container = ref(null)
const canvas= ref(null)
const width = ref(0)
const resizeEventListener = ref(false)

// ==================================================================== Computed
const svgPathData = computed(() => originalPath.value ? useSvgPathData(originalPath.value) : false)

const startPointsX = computed(() => {
  const arr = []
  props.breakpointsX.forEach((el, i) => { if (i % 2 === 0) { arr.push(el) }})
  return arr
})

const maxDeltasX = computed(() => {
  const arr = []
  for (let i = 0; i < props.breakpointsX.length; i = i + 2) {
    arr.push(props.breakpointsX[i + 1] - props.breakpointsX[i])
  }
  return arr
})

const clipPath = computed(() => {
  if (props.displayGuides) {
    return originalPath.value
  }
  if (svgPathData.value && width.value) {
    const globalDelta = svgPathData.value.rangeX - width.value
    const path = [originalPath.value]
    let shift = 0
    for (let i = 0; i < maxDeltasX.value.length; i++) {
      const delta = Math.min(globalDelta / maxDeltasX.value.length, maxDeltasX.value[i])
      const nextPath = contractPathRegion(path[i], startPointsX.value[i] - shift, delta)
      path.push(nextPath)
      shift = shift + delta
    }
    return path[path.length - 1]
  }
  return false
})

const clipPathData = computed(() => clipPath.value ? useSvgPathData(clipPath.value) : false)

// ==================================================================== Watchers
watch(clipPath, () => {
  if (props.displayGuides) {
    drawClipRegion()
  }
})

// ======================================================================= Hooks
onMounted(() => {
  originalPath.value = findPathElement()
  resizeDimensions()
  resizeEventListener.value = useThrottle(() => { resizeDimensions() }, 50)
  window.addEventListener('resize', resizeEventListener.value)
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

const parsePathData = (path) => {
  const moves = path.split(/(?<=[MmLlHhVvCcSsQqTtAaZz])/).map(move => move.trim())
  const parsed = []
  moves.forEach((move) => {
    if (move.length > 1) {
      parsed.push(move.substring(0, move.length - 2).trim(), move.charAt(move.length - 1))
    } else {
      parsed.push(move)
    }
  })
  return parsed.map(item => item.split(' '))
}

const contractPathRegion = (path, start, dif) => {
  const parsed = parsePathData(path)
  parsed.forEach((arr, i) => {
    const val = parseFloat(arr[0])
    if (!isNaN(val)) {
      const cmd = parsed[i - 1]
      if (cmd[0] !== 'V') {
        arr.forEach((num, j) => {
          if (j % 2 === 0 && num > start) {
            parsed[i][j] = num - dif
          }
        })
      }
    }
  })
  return parsed.flat().join(' ')
}

const drawClipRegion = () => {
  if (canvas.value && clipPathData.value) {
    const w = clipPathData.value.rangeX
    const h = clipPathData.value.rangeY
    canvas.value.width = w
    canvas.value.height = h
    const ctx = canvas.value.getContext("2d")
    for (let i = 0; i < props.breakpointsX.length; i++) {
      const x = props.breakpointsX[i]
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, h)
      ctx.strokeStyle = 'red'
      ctx.stroke()
    }
  }
}

const resizeDimensions = () => {
  const ctn = container.value
  const rect = ctn.getBoundingClientRect()
  width.value = rect.width
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
  top: 0;
  left: 0;
}

.overlay-content {
  position: relative;
}

canvas {
  position: absolute;
}
</style>