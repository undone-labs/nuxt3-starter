<template>
  <main class="page">

    <h1 class="page-heading">
      Redirect Unauthenticated
    </h1>

    <ZeroMarkdownParser :markdown="markdown[0].raw" />

  </main>
</template>

<script setup>
// ======================================================================= Setup
definePageMeta({
  layout: 'zero-layout'
})

// ======================================================================== Data
const { data: markdown } = await useAsyncData('content', () => {
  return queryContent({
    where: {
      _path: { $contains: '/zero/kitchen-sink/redirect-unauthenticated' }
    }
  }).find()
})
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
</style>
