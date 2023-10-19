<template>
  <main class="page">

    <h1 class="page-heading">
      Alert
    </h1>

    <!-- <ZeroMarkdownParser
      :markdown="content[0].raw"
      class="markdown" /> -->

  </main>
</template>

<script setup>
// ======================================================================= Setup
definePageMeta({
  layout: 'zero-layout'
})

// ======================================================================== Data
// const { data: content } = await useAsyncData('content', () => {
//   return queryContent({
//     where: {
//       _path: { $contains: '/zero/kitchen-sink/markdown-sample' }
//     }
//   }).find()
// })
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.markdown {
  width: 100%;
}
</style>
