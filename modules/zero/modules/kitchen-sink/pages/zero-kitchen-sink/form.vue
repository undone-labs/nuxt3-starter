<template>
  <main class="page">

    <ZeroMarkdownParser
      :markdown="markdown"
      class="markdown" />

    <ZeroKitchenSinkFieldContainer :scaffold="scaffold.data_owner_name" />
    <ZeroKitchenSinkFieldContainer :scaffold="scaffold.ecosystem_associates_radio" />
    <ZeroKitchenSinkFieldContainer :scaffold="scaffold.ecosystem_associates_textarea" />
    <ZeroKitchenSinkFieldContainer :scaffold="scaffold.confirm_follow_fil_guideline" />
    <ZeroKitchenSinkFieldContainer :scaffold="scaffold.your_role" />

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
      _path: { $contains: '/zero/kitchen-sink/form' }
    }
  }).find()
})

const markdown = content.value.find(item => item._extension === 'md').raw
const scaffold = content.value.find(item => item._extension === 'json')
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.markdown {
  width: 100%;
}

:deep(.field-container) {
  &:not(:last-child) {
    margin-bottom: 3rem;
  }
}
</style>
