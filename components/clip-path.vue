<template>
  <div class="container">

    <svg class="svg-clip-path">
      <defs>
        <clipPath
          id="clip-path-element"
          clipPathUnits="objectBoundingBox"
          :transform="transform">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            :d="path"
            fill="none" />
        </clipPath>
      </defs>
    </svg>

    <div class="clip-wrapper">
      <div class="clipped-content">
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
  path: {
    type: String,
    required: true,
    default: ''
  }
})

// ==================================================================== Computed
const parsed = computed(() => {
  const commands = parseSVG(props.path)
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

const transform = computed(() => {
  const rX = Math.abs(bounds.value.maxX - bounds.value.minX)
  const rY = Math.abs(bounds.value.maxY - bounds.value.minY)
  return `scale(${1 / rX} ${1 / rY})`
})

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
  border-radius: toRem(8);
}

.svg-clip-path {
  position: absolute;
  top: -9999px;
  left: -9999px;
  width: 0;
  height: 0;
}

.clipped-content {
  width: 300px;
  height: 100%;
  clip-path: url(#clip-path-element);
}
</style>