<template>
  <main class="page">

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
      _path: { $contains: '/zero/kitchen-sink/redirect-after-logout' }
    }
  }).find()
})
</script>
