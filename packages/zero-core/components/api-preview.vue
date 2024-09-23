<template>
  <div class="api-preview">
    <div
      v-for="(slider, i) in props.sliders"
      :key="`slider-${i}`"
      class="api-slider">

      <div class="slider-heading">
        <div v-if="slider.metadata" class="metadata">
          <span
            v-for="(value, key) in slider.metadata"
            :key="key"
            :class="['monospace', key]">
            {{ value }}
          </span>
        </div>
      </div>

      <div class="slider">

        <div class="slider-tabs">
          <div
            v-for="slide in slider.slides"
            :key="`tab-${slide.id}`"
            :class="['tab', { active: slide.id === activeSlides[slide.sliderId] }]"
            @click="setActiveSlide(slide)">
            {{ slide.tab }}
          </div>
        </div>

        <div class="slide-content">
          <div
            v-for="slide in slider.slides"
            :key="`slide-${slide.id}`"
            :class="['code-wrapper', { active: slide.id === activeSlides[slide.sliderId] }]"
            :data-language="slide.language">
            <button
              class="copy-button"
              @click="copyText(slide.id, slide.highlighted)">
              {{ copiedCodeBlock === slide.id ? 'Copied!' : 'Copy' }}
            </button>
            <pre><code class="code-block" v-html="slide.highlighted.code" /></pre>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
/**
 * @description A slider component that displays API example requests and responses with highlighted code syntax using [zeroHighlightCode](/zero-core/composables/highlight-code). The component will render a list of individual sliders from the sliders prop array. Before the component is mounted, a unique sliderId is generated for each slider and inserted into each slide to associate it with the correct slider.
 */
// ======================================================================= Props
const props = defineProps({
  /**
   * An array of slider objects. Each object should have a nested `metadata` object and a nested `slides` array. Each value in the `metadata` object will be displayed above its slider in a heading section. The slides array should consist of objects with the following structure:
   * @param {string} id A unique ID for the slide in the scope of its own slider.
   * @param {string} tab A label for the slide tab selector button.
   * @param {string} content The code example string.
   * @param {string} language The language the code is written in.
   */
  sliders: {
    type: Array,
    required: true,
    default: () => []
  }
})

// ======================================================================== Data
const zeroStore = useZeroStore()
const activeSlides = ref({})
const copiedCodeBlock = ref(null)

// ===================================================================== Methods
/**
 * @method setActiveSlide
 * @desc - Sets the active slide of the slider in question. This method is called when a slider tab is clicked. It uses the internally generated sliderId in each slide object to know which slider to alter.
 * @param {object} slide The slide object of the slide to make active.
 */
const setActiveSlide = slide => {
  activeSlides.value[slide.sliderId] = slide.id
}

/**
 * @method copyText
 * @desc - Copies the slide content to the clipboard state in the [Zero Store](/zero-core/use-zero-store#setclipboard).
 * @param {string} id The ID of the slide being copied.
 * @param {string} text The text to copy to the clipboard.
 */
const copyText = (id, text) => {
  useAddTextToClipboard(text)
  zeroStore.setClipboard(text)
  copiedCodeBlock.value = id
}

// ======================================================================= Hooks
props.sliders.forEach(slider => {
  const sliderId = zeroUuid().v4()
  slider.slides.forEach(slide => {
    const content = typeof slide.content === 'object' ?
      JSON.stringify(slide.content, undefined, 2).trim() :
      slide.content.trim()
    slide.id = zeroUuid().v4()
    slide.sliderId = sliderId
    slide.highlighted = zeroHighlightCode(content, slide.language)
  })
  setActiveSlide(slider.slides[0])
})
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.slider-heading {
  display: flex;
  padding: 0 toRem(18);
  margin-bottom: toRem(9);
}

.metadata {
  display: flex;
  align-items: center;
  font-family: $font_Mono;
}

.monospace {
  @include inlineCode;
  font-size: toRem(16);
  color: var(--theme-color);
  background-color: transparent;
  transition: color 500ms;
  &:not(:last-child) {
    margin-right: toRem(7);
  }
}

.tag {
  font-size: toRem(14);
  font-weight: 500;
  color: var(--api-preview__http-status-code__color);
  padding: toRem(3) toRem(7);
  padding-bottom: toRem(1);
  background-color: var(--api-preview__http-status-code__background-color);
  border-radius: toRem(2);
  transition: background-color 500ms, color 500ms;
}

.slider {
  border: solid 2px var(--divider);
  border-radius: toRem(5);
  margin-bottom: toRem(18);
  overflow: hidden;
  transition: border-color 500ms;
}

.slider-tabs {
  display: flex;
  border-bottom: solid 2px var(--divider);
  background-color: var(--background-color__secondary);
  transition: background-color 500ms, color 500ms, border-color 500ms;
}

.slide-content {
  padding: toRem(12) toRem(24);
  background-color: var(--background-color);
  transition: background-color 500ms, color 500ms;
  pre {
    display: flex;
    margin: 0;
  }
}

.tab {
  @include h5;
  position: relative;
  padding: toRem(7) toRem(24);
  cursor: pointer;
  color: var(--theme-color);
  transition: color 500ms;
  &:after {
    content: '';
    position: absolute;
    top: calc(100% - 0.5px);
    left: toRem(24);
    width: calc(100% - #{toRem(48)});
  }
  &.active {
    &:after {
      border-bottom: solid 3px var(--link-color);
      transition: border-color 500ms;
    }
  }
  &:not(:last-child) {
    margin-right: toRem(5);
  }
}

.code-block {
  @include blockCode;
  margin: 0;
  padding: 0;
  background-color: transparent;
}

.copy-button {
  right: 0;
}

.code-wrapper {
  display: none;
  &.active {
    display: block;
  }
}
</style>
