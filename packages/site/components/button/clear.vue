<template>
  <ZeroButton
    v-slot="{ loading }"
    class="clear">

    <LoaderMaterialCircle v-if="loading && !disableLoader" />

    <div class="slot">
      <slot :loading="loading" />
    </div>

  </ZeroButton>
</template>

<script setup>
// ======================================================================= Setup
defineProps({
  disableLoader: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.loader {
  position: absolute;
  top: calc(50% - #{toRem(6)}); // minus half dimension of loader
  left: calc(50% - #{toRem(6)}); // minus half dimension of loader
  transform: translate(-50%, -50%);
  + .slot {
    opacity: 0;
  }
}

.slot {
  display: flex;
  flex-direction: row;
  align-items: center;
}

// ////////////////////////////////////////////////////////////////////// Themes
[class*=center] {
  .slot {
    justify-content: center;
  }
}
</style>
