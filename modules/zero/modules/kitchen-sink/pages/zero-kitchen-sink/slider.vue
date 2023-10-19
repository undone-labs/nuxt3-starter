<template>
  <main class="page">

    <h1 class="page-heading">
      Slider
    </h1>

    <ZeroSlider slider-id="demoSlider">

      <template #panels>
        <ZeroSliderPanel
          v-for="(panel, i) in panels"
          :key="`slide-${i}`"
          slider-id="demoSlider"
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
        slider-id="demoSlider"
        direction="previous">
        <template #button-content>
          {{ "<- PREVIOUS" }}
        </template>
      </ZeroSliderButton>

      <ZeroSliderButton
        slider-id="demoSlider"
        direction="next">
        <template #button-content>
          {{ "NEXT ->" }}
        </template>
      </ZeroSliderButton>
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

const panels = ref(content.value[0].panels)
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.button-row {
  display: flex;
  justify-content: space-between;
}
// //////////////////////////////////////////////////////////// Component Tweaks
.slider {
  margin-bottom: 1rem;
}

.slider-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.slider-button {
  padding: 0 toRem(10);
  background-color: var(--divider);
  border-radius: toRem(4);
  &:hover {
    background-color: var(--link-hover-color);
  }
}
</style>
