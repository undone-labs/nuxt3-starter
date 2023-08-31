<template>
  <div class="layout default">

    <SiteHeader />

    <slot />

    <SiteFooter />

  </div>
</template>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.layout {
  padding-top: $siteHeaderHeight;
}
</style>
