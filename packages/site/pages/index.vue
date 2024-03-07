<template>
  <div class="page">
    <div class="grid">
      <div class="col">

        Index Page

        <ZeroRemarkdownParser :markdown="markdown.raw" />

      </div>
    </div>
  </div>
</template>

<script setup>
const { data: markdown } = await useAsyncData('remarkdown-parser', async () => {
  const result = await queryContent({
    where: {
      _path: { $contains: 'markdown-sample' }
    }
  }).find()
  return result[0]
})

</script>
