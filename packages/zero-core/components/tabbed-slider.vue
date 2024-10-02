<template>
  <div :class="['tabbed-slider', { 'fixed-height': fixedHeight }]">

    <!-- ====================================================== before track -->
     <!-- 
      @slot Can be used to add control elements before the slides.
        @binding {func} change-slide Binds the [changeSlide](/zero-core/components/tabbed-slider#changeslide) method.
        @binding {func} current-slide Binds the [currentSlide](/zero-core/components/tabbed-slider#currentslide) computed property.
    -->
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
          <!--
            @slot Content to inject into each slide. Should be generated from an array of slides.
              @binding {string} name The name of each indiviudal slide slot. Keys from the slides prop will be used for these values.
              @binding {Object} data The slide data object of each slide.
              @binding {func} change-slide Binds the [changeSlide](/zero-core/components/tabbed-slider#changeslide) method.
              @binding {boolean} active Whether or not this slide is currently selected.
          -->
          <slot
            :name="key"
            :data="slide"
            :change-slide="changeSlide"
            :active="activeSlide === key" />
        </div>
      </div>
    </div>

    <!-- ======================================================= after track -->
    <!-- 
      @slot Can be used to add control elements after the slides.
        @binding {func} change-slide Binds the [changeSlide](/zero-core/components/tabbed-slider#changeslide) method.
        @binding {func} current-slide Binds the [currentSlide](/zero-core/components/tabbed-slider#currentslide) computed property.
    -->
    <slot
      name="after-track"
      :change-slide="changeSlide"
      :current-slide="currentSlide" />

  </div>
</template>

<script setup>
/**
 * @description A slider component that is navigable through tabs corresponding to each slide.
 */
// ======================================================================= Setup
const props = defineProps({
  /**
   * Unique slider ID that can be targetted with global $bus events
   */
  id: {
    type: String,
    required: false,
    default: ''
  },
  /**
   * An object whose keys are unique slide ID strings and corresponding values are slide objects containing data pertaining to its respective slide.
   */
  slides: {
    type: Object,
    required: true
  },
  /**
   * Explicitly set the default slide by index. Defaults to 0, the first slide.
   */
  defaultSlideIndex: {
    type: Number,
    required: false,
    default: 0
  },
  /**
   * Whether or not the slider should animate height as slides with differing heights slide into view.
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

const emit = defineEmits([
  /**
   * Emits the new value returned by [currentSlide](/zero-core/components/tabbed-slider#currentslide) right after the slide is changed.
   * @returns {{ slug: string, data: Object }}
   */
  'slideChanged'
])

const { $bus } = useNuxtApp()

// ==================================================================== Computed
/**
 * @method slugs
 * @computed
 * @desc An array of unique slugs corresponding to each slide. Generated from the keys of the slides prop object.
 * @returns {[string]}
 */
const slugs = computed(() => Object.keys(props.slides))

/**
 * @method count
 * @computed
 * @desc Returns the number of slides.
 * @returns {number}
 */
const count = computed(() => slugs.value.length)

/**
 * @method currentSlideIndex
 * @computed
 * @desc Returns the index of the currently selected slide.
 * @returns {number}
 */
const currentSlideIndex = computed(() => slugs.value.indexOf(activeSlide.value))

/**
 * @method currentSlide
 * @computed
 * @desc Returns an object containing the slug/id of the newly selected slide and its data at the moment the slide is selected.
 * @returns {{ slug: string, data: Object }}
 */
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
 * @desc Sets the new height of the slider track if the `animateHeight` prop is enabled.
 */

const setPanelHeight = () => {
  if (props.animateHeight) {
    activeSlideHeight.value = slideRefs.value[currentSlideIndex.value].clientHeight + 'px'
  }
}

/**
 * @method changeSlide - Changes the current slide.
 * @desc - Changes the current slide. Emits the [currentSlide](/zero-core/components/tabbed-slider#currentslide) value.
 * @param {string} slug - The slug of the slide to switch to.
 */

const changeSlide = slug => {
  activeSlide.value = slug
  emit('slideChanged', currentSlide.value)
}

/**
 * @method handleChangeSlideBusEvent
 * @desc Calls the [changeSlide](/zero-core/components/tabbed-slider#changeslide) method when the `ZeroTabbedSlider__changeSlide` bus event is fired via [$bus](/zero-core/plugins#bus).
 * @param {Object} payload Slide data.
 * @param {string} payload.id The ID of the slider. Must match the `id` prop of this component.
 * @param {string} payload.slug The slug/id of the slide to set to active. Must be one of the keys in the `slides` prop.
 */

const handleChangeSlideBusEvent = payload => {
  if (props.id !== payload.id) { return }
  changeSlide(payload.slug)
}

/**
 * @method handleResetHeightBusEvent
 * @desc Calls the [setPanelHeight](/zero-core/components/tabbed-slider#setpanelheight) method when the `ZeroTabbedSlider__resetHeight` bus event is fired via [$bus](/zero-core/plugins#bus).
 * @param {string} id The ID of the slider. Must match the `id` prop of this component.
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
