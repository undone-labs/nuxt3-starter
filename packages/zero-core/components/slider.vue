<template>
  <div
    ref="container"
    :class="['slider', `mode__${mode}`, { loaded }, `direction__${marqueeDirection}`]"
    :style="{ '--animation-period': `${duration}ms` }">

    <div
      class="carousel"
      :style="{ width: carouselWidth, height: slideHeight }">
      <div
        v-for="(_, i) in slides"
        :key="`slide-${i}`"
        ref="slots"
        :class="['slide', mode === 'slider' ? getSlideClasses(indices[i]) : '']"
        :style="{
          height: slideHeight,
          ...(mode === 'slider' && { transform: `translateX(calc(${getSlidePosition(indices[i])}% + ${carousel / 2}px))` }),
          ...(mode === 'marquee' && {
            '--0-deg-phase': `calc(${offset}% + ${carousel / 2}px)`,
            '--179-deg-phase': `calc(${offset - 100 * center}% + ${carousel / 2}px)`,
            '--181-deg-phase': `calc(${offset + 100 * center}% + ${carousel / 2}px)`,
            'animation-delay': `${-1 * period * (slides.length - 1 - i)}ms`
          })
        }">
        <slot name="slide" :index="i"></slot>
      </div>
    </div>

    <slot
      name="controls"
      :increment="increment">
    </slot>

  </div>
</template>

<script setup>
// ======================================================================= Props
const props = defineProps({
  slides: {
    type: Array,
    required: true
  },
  display: {
    type: Number,
    required: false,
    default: 3
  },
  mode: {
    type: String,
    default: 'slider',
    validator (value) {
      return ['slider', 'marquee'].includes(value)
    }
  },
  period: {
    type: Number,
    required: false,
    default: 300
  },
  marqueeDirection: {
    type: String,
    default: 'left',
    validator (value) {
      return ['left', 'right'].includes(value)
    }
  }
})

// ======================================================================== Data
const slots = ref(null)
const indices = ref([])
const container = ref(null)
const slideWidth = ref(0)
const slideHeight = ref('unset')
const resizeEventListener = ref(false)
const loaded = ref(false)

// ==================================================================== Computed
const center = computed(() => Math.floor(props.slides.length / 2))
const offset = computed(() => props.display % 2 === 1 ? 50 : 0)
const carousel = computed(() => slideWidth.value * props.display)
const carouselWidth = computed(() => slideWidth.value === 0 ? 'unset' : carousel.value + 'px')
const duration = computed(() => props.mode === 'marquee' ? props.period * props.slides.length : props.period)

// ======================================================================= Hooks
onMounted(() => {
  indices.value = props.slides.map((_, i) => (i + (center.value - Math.floor(props.display / 2))) % props.slides.length)
  console.log(indices.value)
  getSlideWidths()
  resizeEventListener.value = zeroThrottle(() => { resetSlideWidths() }, 50)
  window.addEventListener('resize', resizeEventListener.value)
  nextTick(() => { loaded.value = true })
})

onBeforeUnmount(() => {
  if (resizeEventListener.value) { window.removeEventListener('resize', resizeEventListener.value) }
})

// ===================================================================== Methods
const getSlidePosition = pos => {
  return ((pos - center.value) * 100) - offset.value
}

const getSlideClasses = pos => {
  return Math.abs(pos - center.value) > Math.ceil(props.display / 2) + 1 ? 'hidden' : ''
}

const getSlideWidths = () => {
  if (slots.value) {
    slideWidth.value = Math.max(...slots.value.map(el => el.clientWidth))
    slideHeight.value = Math.max(...slots.value.map(el => el.clientHeight)) + 'px'
  }
}

const resetSlideWidths = () => {
  slideWidth.value = 0
  slideHeight.value = 'unset'
  nextTick(() => { getSlideWidths() })
}

const increment = val => {
  if (val > 0) {
    const slide = indices.value.pop()
    indices.value.unshift(slide)
  } else {
    const slide = indices.value.shift()
    indices.value.push(slide)
  }
}

</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.slider {
  --animation-period: 300ms;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  &.mode__slider.loaded {
    .slide {
      transition: transform var(--animation-period) ease;
    }
  }
  &.mode__marquee {
    .slide {
      animation-duration: var(--animation-period);
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }
    &.direction__left {
      .slide {
        animation-name: rotate;
      }
    }
    &.direction__right {
      .slide {
        animation-name: rotateReverse;
      }
    }
  }
}

.carousel {
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.slide {
  --0-deg-phase: 0%;
  --179-deg-phase: -100%;
  --181-deg-phase: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  visibility: visible;
  &.hidden {
    visibility: hidden;
  }
}

// ////////////////////////////////////////////////////////////////// Animations
@keyframes rotate {
  0% {
    transform: translateX(var(--0-deg-phase));
    visibility: visible;
  }
  49% {
    transform: translateX(var(--179-deg-phase));
    visibility: hidden;
  }
  51% {
    transform: translateX(var(--181-deg-phase));
    visibility: hidden;
  }
  52% {
    visibility: visible;
  }
  100% {
    transform: translateX(var(--0-deg-phase));
  }
}

@keyframes rotateReverse {
  0% {
    transform: translateX(var(--0-deg-phase));
    visibility: visible;
  }
  49% {
    transform: translateX(var(--181-deg-phase));
    visibility: hidden;
  }
  51% {
    transform: translateX(var(--179-deg-phase));
    visibility: hidden;
  }
  52% {
    visibility: visible;
  }
  100% {
    transform: translateX(var(--0-deg-phase));
  }
}
</style>
