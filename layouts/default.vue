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
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}
</style>
