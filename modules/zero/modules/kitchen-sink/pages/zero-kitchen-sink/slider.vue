<template>
  <main class="page">

    <h1 class="page-heading">
      Slider
    </h1>

    <!--**
        * [Slider] one slide at a time
        * -->
    <div class="slider-wrapper">
      <span class="slider-caption"> This slider shows one slide at a time </span>

      <ZeroSlider :slider-id="singlePanelSliderId">

        <template #panels>
          <ZeroSliderPanel
            v-for="(panel, i) in singlePanelSlider.panels"
            :key="`slide-${i}`"
            :slider-id="singlePanelSliderId"
            :panel-index="i">
            <template #panel-content>
              <img
                class="panel-image"
                :src="panel.image" />
              <p v-html="panel.title" />
            </template>
          </ZeroSliderPanel>
        </template>

      </ZeroSlider>

      <div class="button-row">
        <ZeroSliderButton
          :slider-id="singlePanelSliderId"
          direction="previous">
          <template #button-content>
            {{ "<- PREVIOUS" }}
          </template>
        </ZeroSliderButton>


        <ZeroSliderButton
          :slider-id="singlePanelSliderId"
          direction="next">
          <template #button-content>
            {{ "NEXT ->" }}
          </template>
        </ZeroSliderButton>
      </div>
    </div>

    <!--**
        * [Slider] 5 slides by default,
        * -->
    <div class="slider-wrapper">
      <span class="slider-caption"> This slider shows five slides by default,  three slides at medium, and one slide at mini </span>

      <ZeroSlider
        :slider-id="fivePanels"
        :display-options="fivePanelSlider.display_options"
        :click-to-center="true">

        <template #panels>
          <ZeroSliderPanel
            v-for="(panel, i) in fivePanelSlider.panels"
            :key="`slide-${i}`"
            :slider-id="fivePanels"
            :panel-index="i">
            <template #panel-content>
              <img
                class="panel-image"
                :src="panel.image" />
              <p v-html="panel.title" />
            </template>
          </ZeroSliderPanel>
        </template>

      </ZeroSlider>

      <div class="button-row">
        <ZeroSliderButton
          :slider-id="fivePanels"
          direction="previous">
          <template #button-content>
            {{ "<- PREVIOUS" }}
          </template>
        </ZeroSliderButton>


        <ZeroSliderButton
          :slider-id="fivePanels"
          direction="next">
          <template #button-content>
            {{ "NEXT ->" }}
          </template>
        </ZeroSliderButton>
      </div>
    </div>

  </main>
</template>

<script setup>
// ======================================================================= Setup
definePageMeta({
  layout: 'zero-layout',
  authenticate: false
})

// ======================================================================== Data
const { data: content } = await useAsyncData('content', () => {
  return queryContent({
    where: {
      _path: { $contains: '/zero/kitchen-sink/slider-sample' }
    }
  }).find()
})
// ==================================================================== Computed
const singlePanelSlider = computed(() => content.value[0].demo_slider_single_panel)
const singlePanelSliderId = useUnSlugify(singlePanelSlider.value.id, 'camel-case', '_')

const fivePanelSlider = computed(() => content.value[0].demo_slider_five_panels)
const fivePanels = useUnSlugify(fivePanelSlider.value.id, 'camel-case', '_')

</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.button-row {
  display: flex;
  justify-content: space-between;
}
// //////////////////////////////////////////////////////////// Component Tweaks
.slider-wrapper {
  &:not(:last-child) {
    margin-bottom: 5rem;
  }
}
.slider {
  margin-bottom: 1rem;
}

.slider-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 toRem(10);
}

.panel-image {
  width: 100%;
}

.slider-button {
  height: fit-content;
  padding: 0 toRem(10);
  background-color: var(--divider);
  border-radius: toRem(4);
  &:hover,
  &:focus-visible {
    background-color: var(--link-hover-color);
  }
  @include small {
    order: 3;
  }
}

.slider-caption {
  display: block;
  text-align: center;
}
</style>
