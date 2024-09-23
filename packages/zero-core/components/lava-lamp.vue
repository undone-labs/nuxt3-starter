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
      <!-- 
        @slot Entry elements generated from the entries array
          @binding {any} entry Each individual entry used to populate the slot. Typically this would be an object whose properties could be used by the child elements.
      -->
      <slot :entry="entry" />
    </div>

    <div
      ref="markerRef"
      :class="['marker', { active }]"
      :style="styles">
      <!-- 
        @slot The visual element that acts to highlight the hovered entry.
      -->
      <slot name="marker" />
    </div>

  </component>
</template>

<script setup>
/**
 * @description A wrapper element around an array of entries that highlights the entry currently being hovered. A background element called the marker, automatically assumes the dimensions and position of the entry it is highlighting.
 */
// ======================================================================= Setup
defineProps({
  /**
   * The tagname of the component root element. Must be a valid HTML element tag. Default is `div`.
   * @values div, nav, span, etc.
   */
  tag: {
    type: String,
    required: false,
    default: 'div'
  },
  /**
   * The array of entries used to generate slot children in the default slot.
   */
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
 * @desc - The handler bound to a wrapper div around each individual entry. Called when a `mouseenter` event fires from the mouse hovering over an entry. The method calculates the dimensions and position of that entry to pass to the styles attribute of the marker while also activating the animation.
 * @param {MouseEvent} e The native Mouse Event passed from the `mouseenter` directive.
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
 * @desc - The handler bound to the lava lamp root element, fired on `mouseleave` event. This method uses a setTimeout function to hide the marker after the end animation duration has transpired.
 * @param {MouseEvent} e The native Mouse Event passed from the `mouseenter` directive.
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
