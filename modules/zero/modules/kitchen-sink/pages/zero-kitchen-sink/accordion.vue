<template>
  <main class="page">

    <h1 class="page-heading">
      Accordion
    </h1>

    <ZeroAccordion>
      <!-- v-slot="{ active }"> -->


    </ZeroAccordion>

    <!-- :markdown="content[0].raw" -->

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
      _path: { $contains: '/zero/kitchen-sink/acordion-sample' }
    }
  }).find()
})
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.markdown {
  width: 100%;
}
</style>
