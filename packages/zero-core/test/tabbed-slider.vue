<template>
  <div :class="['tabbed-slider', { 'fixed-height': fixedHeight }]">

    <!-- ====================================================== before track -->
    <slot
      name="before-track"
      :change-slide="changeSlide"
      :current-slide="currentSlide" />

    <!-- ====================================================== window/track -->
    <div
      :style="{ height: activeSlideHeight }"
      :class="['window', { 'animate-height': animateHeight }]">
      <!-- track -->
      <div
        :style="{
          width: `${count * 100}%`,
          transform: `translateX(-${100 / (count / currentSlideIndex)}%)`
        }"
        class="track">
        <!-- slide -->
        <div
          v-for="(slide, key, index) in slides"
          :key="key"
          :style="{
            left: `${100 / (count / index)}%`,
            width: `${100 / count}%`
          }"
          ref="slideRefs"
          class="slide">
          <!-- slide content -->
          <slot
            :name="key"
            :data="slide"
            :change-slide="changeSlide"
            :active="activeSlide === key" />
        </div>
      </div>
    </div>

    <!-- ======================================================= after track -->
    <slot
      name="after-track"
      :change-slide="changeSlide"
      :current-slide="currentSlide" />

  </div>
</template>

<script setup>
/**
 * @description A Slider component that is navigable through tabs corresponding to each slide.
 */
// ======================================================================= Setup
const props = defineProps({
  /**
   * Specific slider ID that can be targetted with global $bus events
   * @values small, medium, large
   */
  id: {
    type: String,
    required: false,
    default: ''
  },
  /**
   * Object keys used as slide IDs
   */
  slides: {
    type: Object,
    required: true
  },
  /**
   * Set the default slide to be anything other than the first slide
   */
  defaultSlideIndex: {
    type: Number,
    required: false,
    default: 0
  },
  /**
   * Choose to disable height animation
   */
  animateHeight: {
    type: Boolean,
    required: false,
    default: true
  },
  /**
   * A fixed-height slider's slides are set to `height: 100%`. Usually to allow for scrolling within a slide.
   */
  fixedHeight: {
    type: Boolean,
    required: false,
    default: false
  }
})

// ======================================================================== Data
const slideRefs = ref(null)
const activeSlide = ref(Object.keys(props.slides)[props.defaultSlideIndex])
const activeSlideHeight = ref(null)

const emit = defineEmits(['slideChanged'])

const { $bus } = useNuxtApp()

// ==================================================================== Computed
/**
 * A list of slugs corresponding to each slide
 */
const slugs = computed(() => Object.keys(props.slides))
const count = computed(() => slugs.value.length)
const currentSlideIndex = computed(() => slugs.value.indexOf(activeSlide.value))
const currentSlide = computed(() => {
  const slug = activeSlide.value
  return {
    slug,
    data: props.slides[slug]
  }
})

// ==================================================================== Watchers
watch(activeSlide, async slug => {
  await nextTick(() => {
    setPanelHeight(slug)
  })
})

// ===================================================================== Methods
/**
 * @method setPanelHeight
 */

const setPanelHeight = () => {
  if (props.animateHeight) {
    activeSlideHeight.value = slideRefs.value[currentSlideIndex.value].clientHeight + 'px'
  }
}

/**
 * @method changeSlide
 * @desc Changes the current slide.
 * @param {string} slug - The slug of the slide to switch to.
 */

const changeSlide = slug => {
  activeSlide.value = slug
  emit('slideChanged', currentSlide.value)
}

/**
 * @method handleChangeSlideBusEvent
 */

const handleChangeSlideBusEvent = payload => {
  if (props.id !== payload.id) { return }
  changeSlide(payload.slug)
}

/**
 * @method handleResetHeightBusEvent
 */

const handleResetHeightBusEvent = id => {
  if (props.id !== id) { return }
  setPanelHeight()
}

// ======================================================================= Hooks
emit('slideChanged', currentSlide.value)

$bus.$on('ZeroTabbedSlider__changeSlide', handleChangeSlideBusEvent)
$bus.$on('ZeroTabbedSlider__resetHeight', handleResetHeightBusEvent)

onMounted(async () => {
  await nextTick(() => {
    setPanelHeight(activeSlide.value)
  })
})

onBeforeUnmount(() => {
  $bus.$off('ZeroTabbedSlider__changeSlide', handleChangeSlideBusEvent)
  $bus.$off('ZeroTabbedSlider__resetHeight', handleResetHeightBusEvent)
})
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.tabbed-slider {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  &.fixed-height {
    .slide {
      height: 100%;
    }
  }
}

.window {
  position: relative;
  width: 100%;
  overflow: hidden;
  transition: height 150ms ease-in-out;
  &:not(.animate-height) {
    flex: 1;
  }
}

.track {
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 100%;
  transition: 150ms ease-in-out;
}

.slide {
  position: absolute;
  top: 0;
  width: 50%;
}
</style>
