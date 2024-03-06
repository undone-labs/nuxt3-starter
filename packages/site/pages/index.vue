<template>
  <div class="page">
    <div class="grid">
      <div class="col">

        Index Page

        <ZeroRemarkdownParser :markdown="data" />

      </div>
    </div>
  </div>
</template>

<script setup>
const { data } = await useAsyncData('remarkdown-parser', async () => {
  const content = await queryContent({
    where: {
      _path: { $contains: 'markdown-sample' }
    }
  }).find()
  return content[0].raw
})
</script>
