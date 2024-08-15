<template>
  <section class="site-footer">
    <div>
      This is a footer
    </div>
  </section>
</template>

<style lang="scss" scoped>
.site-footer {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 max(2rem, calc((100% - (var(--vp-layout-max-width) - 64px)) / 2));
  background-color: var(--vp-footer-bg-color);
  height: var(--vp-footer-height);
  z-index: 100;
}
</style>
