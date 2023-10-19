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
          :panel-index="i"
          class="slider-panel">
          <template #panel-content>
            <img
              class="panel-image"
              :src="panel.image" />
            <p v-html="panel.title" />
          </template>
        </ZeroSliderPanel>
      </template>

    </ZeroSlider>

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
// //////////////////////////////////////////////////////////// Component Tweaks
.slider-panel {
  display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
