<template>
  <component
    :is="tag"
    ref="lavaLampRef"
    class="lava-lamp"
    @mouseleave="mouseleave">

    <div
      v-for="(entry, i) in entries"
      :key="i"
      class="lava-entry"
      @mouseenter="mouseenter">
      <slot :entry="entry" />
    </div>

    <div
      ref="markerRef"
      :class="['marker', { active }]"
      :style="styles">
      <slot name="marker" />
    </div>

  </component>
</template>

<script setup>
// ======================================================================= Setup
defineProps({
  tag: {
    type: String,
    required: false,
    default: 'div'
  },
  entries: {
    type: Array,
    required: true
  }
})

const lavaLampRef = ref(null)
const markerRef = ref(null)

const active = ref(false)
const styles = ref(null)

// ===================================================================== Methods
/**
 * @method mouseenter
 */

const mouseenter = e => {
  e.stopPropagation()
  const lavaLampElBox = lavaLampRef.value.getBoundingClientRect()
  const elBox = e.target.getBoundingClientRect()
  styles.value = {
    top: `${elBox.top - lavaLampElBox.top}px`,
    left: `${elBox.left - lavaLampElBox.left}px`,
    width: `${elBox.width}px`,
    height: `${elBox.height}px`
  }
  setTimeout(() => {
    active.value = true
  }, 20)
}

/**
 * @method mouseleave
 */

const mouseleave = e => {
  e.stopPropagation()
  active.value = false
  const style = window.getComputedStyle(markerRef.value)
  const transitionDuration = style.getPropertyValue('transition-duration').match(/[+-]?\d+(\.\d+)?/g)[0] * 1000
  setTimeout(() => {
    styles.value = null
  }, transitionDuration)
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.lava-lamp {
  position: relative;
}

.marker {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;
  transition: opacity 150ms ease-out;
  &.active {
    transition: opacity 150ms ease-in, left 150ms ease-in, width 150ms ease-in, height 150ms ease-in;
    opacity: 1;
  }
}
</style>
