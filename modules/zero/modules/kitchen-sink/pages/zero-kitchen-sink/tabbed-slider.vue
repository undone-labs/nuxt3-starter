<template>
  <main class="page">

    <ZeroKitchenSinkTabbedSlider :slides="slides" />

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
      _path: { $contains: '/zero/kitchen-sink/tabbed-slider' }
    }
  }).find()
})

const slides = content.value.find(item => item._extension === 'json').slides

</script>

<style lang="scss" scoped>

</style>
