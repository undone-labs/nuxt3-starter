<template>
  <main class="page">

    <h1 class="page-heading">
      Markdown Parser
    </h1>

    <ZeroMarkdownParser
      :markdown="markdown[0].raw"
      class="markdown" />

  </main>
</template>

<script setup>
// ======================================================================= Setup
definePageMeta({
  layout: 'zero-layout'
})

// ======================================================================== Data
const { data: markdown } = await useAsyncData('content', () => {
  return queryContent().find()
})
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.markdown {
  width: 100%;
}
</style>
