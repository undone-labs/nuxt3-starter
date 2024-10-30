<template>
  <div :class="['range-container', state]">

    <slot name="above-track" />

    <div :class="['range-track', { disabled }]">

      <div
        ref="thumb"
        class="thumb-container"
        :style="thumbPosition">
        <slot name="thumb" />
      </div>

      <div :style="progressBarWidth" class="progress-bar-container">
        <slot name="progress-bar" :input-width="inputWidth" :tick="tick" />
      </div>

      <input
        :id="modelKey"
        ref="input"
        :position="position"
        :name="modelKey"
        :value="position"
        :min="min"
        :max="steps || max"
        :step="step"
        :style="rangeStyling"
        :class="['range', state, { disabled }]"
        :disabled="disabled"
        type="range"
        @focus="toggleFocused(true)"
        @blur="toggleFocused(false)"
        @input="updateValue($event.target.valueAsNumber)" />

    </div>

    <slot name="below-track"/>

  </div>
</template>

<script setup>
// ======================================================================= Setup
const props = defineProps({
  field: {
    type: Object,
    required: true
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  }
})

const emit = defineEmits(['toggleFocused', 'updateValue'])

// ======================================================================== Data
const thumb = ref(null)
const input = ref(null)

const position = ref(props.field.min)
const thumbDimensions = ref({ x: 0,y: 0 })
const format = ref(false)
const steps = ref(props.field.max)
const transform = ref(false)
const positionList = ref([])

// ==================================================================== Computed
const scaffold = computed(() => props.field.scaffold)
const modelKey = computed(() => scaffold.value.modelKey)
const value = computed(() => props.field.value)
const min = computed(() => logarithmic.value ? 1 : scaffold.value.min)
const max = computed(() => scaffold.value.max)
const step = computed(() => logarithmic.value ? undefined : scaffold.value.step)
const intervals = computed(() => scaffold.value.intervals)
const logarithmic = computed(() => scaffold.value.hasOwnProperty('intervals')) || scaffold.value.min
const state = computed(() => props.field.state)
const tick = computed(() => getTick(position.value))
const thumbPosition = computed(() => {
  const thumbHeight = thumbDimensions.value.h
  return `left: calc(${tick.value}% - ${thumbHeight * (tick.value / 100)}px)`
})
const progressBarWidth = computed(() => {
  const thumbHeight = thumbDimensions.value.h
  return `width: calc(${tick.value}% - ${thumbHeight * (tick.value / 100)}px + ${thumbHeight}px)`
})
const rangeStyling = computed(() => {
  const width = format.value === 'line' ? thumbDimensions.value.h : thumbDimensions.value.w
  return `--thumb-dimension-x: ${width}px; --thumb-dimension-y: ${thumbDimensions.value.h}px;`
})
const inputWidth = computed(() => input.value?.clientWidth)

// ==================================================================== Watchers
watch(value, newValue => position.value = getPosition(newValue))

// ===================================================================== Methods
/**
 * @method getScaleTransform
 */

const getScaleTransform = () => {
  const numIntervals = intervals.value.length
  const descreteSteps = Math.ceil(
    (max.value - min.value) / intervals.value.reduce((total, step) => total + step / numIntervals, 0)
  )
  return [
    descreteSteps,
    (input) => {
      const stepTransforms = intervals.map((s, i) => {
        const setCount = Math.min(Math.ceil(input - (descreteSteps * i / numIntervals)), Math.round(descreteSteps / numIntervals))
        return setCount > 0 ? setCount * s : 0
      })
      let lastStep = 0
      const out = Math.round(stepTransforms.reduce((total, num, i) => {
        if (num) { lastStep = i }
        return total + num
      })) + min
      const currentUnit = intervals[lastStep]
      return Math.min(
        Math.round((out / currentUnit)) * currentUnit,
        max.value
      )
    }
  ]
}

/**
 * @method updateValue
 */

 const updateValue =  (incoming, withoutTransformation) => {
  const value = logarithmic.value && !withoutTransformation ? transform(incoming) : incoming
  emit('updateValue', value)
}

/**
 * @method toggleFocused
 */

 const toggleFocused = focused => emit('toggleFocused', focused)

/**
 * @method getPosition
 */

 const getPosition = value => {
  if (!logarithmic.value) { return value }
  const len = positionList.value.length
  let last
  for (let i = 0; i < len; i++) {
    const item = positionList.value[i]
    if (value >= item.value) { last = i + 1 }
  }
  return last || min.value
}

/**
 * @method getPositionList
 */

const getPositionList = () => {
  const compiled = []
  for (let i = 0; i < steps.value; i++) {
    const step = i + 1
    compiled.push({
      tick: getTick(step),
      value: transform(step)
    })
  }
  return compiled
}

/**
 * @method getTick
 */

 const getTick = position => {
   if (logarithmic.value) {
     return ((position - min.value) / (steps.value - min.value)) * 100
   }
   return Math.min((position / max.value) * 100, 100)
 }

// ======================================================================= Hooks
onMounted(() => {
  nextTick(() => {
    if (logarithmic.value) {
      const [steps, transform] = getScaleTransform()
      steps.value = steps
      transform.value = transform
      positionList.value = getPositionList()
    } else {
      if (!step.value) {
        throw new Error(`Range field ${modelKey} is linear and requires a step value in the scaffold`)
      }
      position.value = step.value % 1 !== 0 ? parseFloat(position.value) : parseInt(position.value)
    }
    position.value = getPosition(value.value)
    thumbDimensions.value = {
      w: thumb.value.offsetWidth,
      h: thumb.value.offsetHeight
    }
    format.value = thumbDimensions.value.w === thumbDimensions.value.h ? 'square' : 'line'
  })
})
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.range-track {
  position: relative;
  width: 100%;
  box-sizing: content-box;
}

.thumb-container {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 10;
}

.progress-bar-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  pointer-events: none;
  z-index: 5;
}

@mixin thumb {
  appearance: none;
  position: relative;
  top: 50%;
  left: 0;
  width: var(--thumb-dimension-x);
  height: var(--thumb-dimension-y);
  opacity: 0;
  transform: translateY(-50%);
  cursor: grab;
  &:active {
    cursor: grabbing;
    background-color: #9F9F92;
  }
}

@mixin track {
  appearance: none;
  width: 100%;
  height: 100%;
  border-color: transparent;
  color: transparent;
  opacity: 0;
  cursor: pointer;
  &:active {
    cursor: grabbing;
  }
}

.range {
  position: relative;
  display: block;
  appearance: auto;
  appearance: none;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 15;
  &:focus {
    outline: none;
  }
  &:not(.disabled) {
    &::-webkit-slider-thumb {
      @include thumb;
    }
    &::-moz-range-thumb {
      @include thumb;
    }
    &::-ms-thumb {
      @include thumb;
    }
    &::-webkit-slider-runnable-track {
      @include track;
    }
    &::-moz-range-track {
      @include track;
    }
    &::-ms-track {
      @include track;
    }
  }
  &.disabled {
    &::-webkit-slider-thumb {
      @include thumb;
      cursor: not-allowed;
      &:active {
        cursor: not-allowed;
      }
    }
    &::-moz-range-thumb {
      @include thumb;
      cursor: not-allowed;
      &:active {
        cursor: not-allowed;
      }
    }
    &::-ms-thumb {
      @include thumb;
      cursor: not-allowed;
      &:active {
        cursor: not-allowed;
      }
    }
    &::-webkit-slider-runnable-track {
      @include track;
      cursor: not-allowed;
      &:active {
        cursor: not-allowed;
      }
    }
    &::-moz-range-track {
      @include track;
      cursor: not-allowed;
      &:active {
        cursor: not-allowed;
      }
    }
    &::-ms-track {
      @include track;
      cursor: not-allowed;
      &:active {
        cursor: not-allowed;
      }
    }
  }
}
</style>
