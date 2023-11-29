<template>
  <div class="container">

    <div ref="svgSlot" class="svg-slot">

      <slot name="svg-path"></slot>

    </div>

    <canvas ref="canvas"></canvas>

  </div>
</template>

<script setup>
// ====================================================================== Import
import CloneDeep from 'lodash.clonedeep'
import { useSvgPathData } from '../modules/zero/modules/kitchen-sink/composables/use-svg-path-data.js'

// ======================================================================= Props
const props = defineProps({
  guidelinesX: {
    type: Array,
    required: false,
    default: () => []
  },
  breakpointsX: {
    type: Array,
    required: false,
    default: () => []
  }
})
// ======================================================================== Data
const svgSlot = ref(null)
const path = ref('')
const canvas= ref(null)
const width = ref(0)
const height = ref(0)
const resizeEventListener = ref(false)

// ==================================================================== Computed
const svgPathData = computed(() => path.value ? useSvgPathData(path.value) : false)

const computedPath = ref('')
// const computedPath = computed(() => {
//   if (svgPathData.value) {
//     if (props.breakpointsX.length) {
//       const commands = CloneDeep(svgPathData.value.commands)
//       for (let i = 0; i < props.breakpointsX.length; i = i + 2) {
//         const start = props.breakpointsX[i]
//         const end = props.breakpointsX[i + 1]
//         const dif = end - start
//         commands.forEach((item) => {
//           const xCoords = Object.keys(item).filter(key => key.startsWith('x'))
//           xCoords.forEach((key) => {
//             if (item[key] > start) {
//               item[key] = item[key] - dif
//             }
//           })
//         })
//         // const intersections = commands.filter(item => {
//         //   const xCoords = Object.keys(item).filter(key => key.startsWith('x')).map(key => item[key])
//         //   return xCoords.some(val => val >= start && val <= end) || (Math.min(...xCoords) <= start && Math.max(...xCoords) >= end)
//         // })
//         // intersections.forEach(line => {
//         //   if (line.x > start) {
//         //     line.x = start
//         //   }
//         // })
//       }

//       let recompiled = ''
//       for (let i = 0; i < commands.length; i++) {
//         const cmd = commands[i]
//         const coords = [cmd.x, cmd.y]
//         if (cmd.x1 && cmd.y1) { coords.push(cmd.x1, cmd.y1) }
//         if (cmd.x2 && cmd.y2) { coords.push(cmd.x2, cmd.y2) }
//         recompiled = recompiled + `${cmd.code} ` + coords.join(' ') + ' '
//       }
//       console.log('recompiled')
//       console.log(recompiled)
//       return recompiled
//     } else {
//       return svgPathData.value.path
//     }
//   }
//   return false
// })

// watch(computedPath, (val) => {
//   console.log(val)
// })
// ======================================================================= Hooks
onMounted(() => {
  path.value = findPathElement()
  // drawClipRegion()
  // resizeDimensions()
  // resizeEventListener.value = () => { resizeDimensions() }
  // window.addEventListener('resize', resizeEventListener.value)

  const moves = path.value.split(/(?<=[MmLlHhVvCcSsQqTtAaZz])/)
  const parsed = []
  moves.forEach((move) => {
    if (move.length > 1) {
      parsed.push(move.substring(0, move.length - 2), move.charAt(move.length - 1))
    } else {
      parsed.push(move)
    }
  })
  const test = parsed.map(item => item.split(' '))
  console.log(test)
  const start = props.breakpointsX[0]
  const end = props.breakpointsX[1]
  const dif = end - start
  test.forEach((arr, i) => {
    const val = parseFloat(arr[0])
    if (typeof val === 'number') {
      arr.forEach((num, j) => {
        if (j % 2 === 0 && num > start) {
          test[i][j] = num - dif
        }
      })
    }
  })

  computedPath.value = test.flat().join(' ')
  drawClipRegion()
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

const drawClipRegion = () => {
  if (canvas.value && svgPathData.value) {
    const w = svgPathData.value.rangeX
    const h = svgPathData.value.rangeY
    canvas.value.width = w
    canvas.value.height = h
    const ctx = canvas.value.getContext("2d")
    const region = new Path2D(computedPath.value)

    ctx.clip(region, "evenodd")
    ctx.fillStyle = "blue"
    ctx.fillRect(0, 0, w, h)

    for (let i = 0; i < props.guidelinesX.length; i++) {
      const x = props.guidelinesX[i]
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, h)
      ctx.strokeStyle = 'red'
      ctx.stroke()
    }
  }
}

const resizeDimensions = () => {
  console.log('resize')
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