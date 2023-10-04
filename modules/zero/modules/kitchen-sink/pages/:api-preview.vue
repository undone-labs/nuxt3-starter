<template>
  <main class="page">

    <h1 class="page-heading">
      API Preview
    </h1>

    <h3>
      API Information
    </h3>

    <ZeroApiInformation
      :headers="apiPreview.headers"
      :query-parameters="apiPreview.query_parameters"
      :response-codes="apiPreview.response_codes" />

    <h3>
      API Explorer
    </h3>

    <ZeroApiExplorer
      :sliders="apiPreview.sliders" />

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
      _path: { $contains: '/zero/kitchen-sink/api-preview' }
    }
  }).find()
})

const apiPreview = content.value[0]
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
// .api-explorer {
//   margin-top: 5rem;
// }

h3 {
  margin-bottom: 3rem;
  &:not(:first-of-type) {
    margin-top: 3rem;
  }
}
</style>
