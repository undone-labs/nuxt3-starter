<template>
  <div class="layout zero">

    <div class="grid-noGutter">

      <!-- ========================================================= Sidebar -->
      <div class="col-3">
        <Sidebar />
      </div>

      <!-- ========================================================= Content -->
      <div class="col-7">
        <slot />
      </div>

    </div>

  </div>
</template>

<script setup>
// ======================================================================= Setup
if (process.client && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  useHead({
    meta: [
      { name: 'msapplication-config', content: '/favicon/dark/browserconfig.xml' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon/dark/favicon-96x96.png' },
      { rel: 'manifest', href: '/favicon/dark/manifest.json' }
    ]
  })
}

// ======================================================================== Data
const zeroStore = useZeroStore()

await useAsyncData('seo', async () => {
  let content = await queryContent({
    where: {
      _file: { $contains: 'data/seo.json' }
    }
  }).find()
  content = content[0] || {}
  zeroStore.setSeo(content)
})

const { $seo } = useNuxtApp()
$seo()
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
</style>
