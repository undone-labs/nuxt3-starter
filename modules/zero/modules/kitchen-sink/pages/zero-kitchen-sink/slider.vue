<template>
  <main class="page">

    <h1 class="page-heading">
      Slider
    </h1>

    <ZeroSlider slider-id="demo-slider">
      <template
        v-for="(panel, i) in panels"
        :key="`slide-${i}`">
        <div
          class="slider-panel">
          <img
            class="panel-image"
            :src="panel.image" />
          <p v-html="panel.title" />
        </div>
      </template>

    </ZeroSlider>

  </main>
</template>

<script setup>
// ======================================================================= Setup
definePageMeta({
  layout: 'zero-layout'
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

</style>
