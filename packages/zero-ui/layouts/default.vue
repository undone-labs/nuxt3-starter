<template>
  <div class="layout zero">

    <!-- =========================================================== Toaster -->
    <ZeroToaster>
      <template #toast="{ toast }">
        <div class="message" v-html="toast.message" />
      </template>
    </ZeroToaster>

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

const { data: Seo } = await useAsyncData('seo', async () => {
  const content = await queryContent({
    where: {
      _file: { $contains: 'data/seo.json' }
    }
  }).find()
  return content[0]
})

zeroStore.setSeo(Seo)
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
:deep(main.page) {
  padding: 20rem 0 20rem 2rem;
}

:deep(.page-heading) {
  margin-bottom: 3rem;
}
</style>
