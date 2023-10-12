<template>
  <div class="layout zero">

    <div class="grid-noGutter">

      <!-- ========================================================= Sidebar -->
      <div class="col-3">
        <ZeroKitchenSinkSidebar />
      </div>

      <!-- ========================================================= Content -->
      <div class="col-7">
        <slot />
      </div>

    </div>

  </div>
</template>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
@import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;500;600;700&display=swap');

div.layout {
  font-family: 'Inconsolata', monospace;
}

:deep(main.page) {
  padding: 20rem 0 20rem 2rem;
  h1 {
    margin-bottom: 3rem;
  }
}

:deep(h1), :deep(.h1),
:deep(h2), :deep(.h2),
:deep(h3), :deep(.h3),
:deep(h4), :deep(.h4),
:deep(h5), :deep(.h5),
:deep(h6), :deep(.h6) {
  line-height: 1;
  margin-bottom: 1rem;
  font-weight: 600;
}

:deep(h1), :deep(.h1) {
  font-size: toRem(46);
}

:deep(h2), :deep(.h2) {
  font-size: toRem(36);
}

:deep(h3), :deep(.h3) {
  font-size: toRem(28);
}

:deep(h4), :deep(.h4) {
  font-size: toRem(22);
}

:deep(h5), :deep(.h5) {
  font-size: toRem(18);
}

:deep(h6), :deep(.h6) {
  font-size: toRem(16);
}
</style>
