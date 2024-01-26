<template>
  <div
    ref="toasterRef"
    class="toaster">

    <template v-for="toast in toasts">
      <ZeroToast
        v-if="toast"
        :key="toast.id"
        :toast="toast"
        :toaster-height-initial="toasterHeightInitial"
        :toaster-height-final="toasterHeightFinal">

        <template #toast="{ toast }">
          <slot name="toast" :toast="toast" />
        </template>

      </ZeroToast>
    </template>

  </div>
</template>

<script setup>
// ======================================================================== Data
const store = useZeroToasterStore()
const { toasts } = storeToRefs(store)
const route = useRoute()

const toasterRef = ref(null)
const toasterHeightInitial = ref(0)
const toasterHeightFinal = ref(0)

/**
 * @note the commented-out code below will be wired up when needed in the future
 */

// ======================================================================= Watch
watch(toasts.value, async () => {
  toasterHeightInitial.value = toasterRef.value.clientHeight
  await nextTick(() => {
    toasterHeightFinal.value = toasterRef.value.clientHeight
  })
})

// ====================================================================== Export
// const displayToastFromQuery = route => {
//   const query = route.query
//   const toast = query.toast
//   if (toast) {
//     this.addMessage(JSON.parse(toast))
//     this.$router.replace({ query: Object.assign({ ...query }, { toast: undefined }) })
//   }
// }
</script>

<style lang="scss" scoped>
$padding: 1rem;

// ///////////////////////////////////////////////////////////////////// General
.toaster {
  position: fixed;
  top: $padding;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  z-index: 100000;
  @include customMaxMQ (32rem) {
    top: $padding;
    left: 0;
    width: 100%;
    padding: 0 $padding;
    transform: none;
  }
}
</style>
