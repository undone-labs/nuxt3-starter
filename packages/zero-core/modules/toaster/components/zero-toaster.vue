<template>
  <div v-if="hasToasts" class="toaster">

    <template v-for="toast in toasts">
      <ZeroToast
        v-if="toast"
        :key="toast.id"
        :toast="toast">

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
const { messages } = storeToRefs(store)
const route = useRoute()

// ==================================================================== Computed
const toasts = computed(() => {
  const toasts = messages.value.filter((message) => {
    if (message && message.type === 'toast') { return message }
    return false
  })
  if (toasts.length > 0) { return toasts.reverse() }
  return false
})

const hasToasts = computed(() => messages.value.length > 0)

/**
 * @note the commented-out code below will be wired up when needed in the future
 */

// ======================================================================= Watch
// watch(route, route => {
//   displayToastFromQuery(route)
// })

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
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: fixed;
  top: 0;
  left: 50%;
  padding-top: $padding;
  transform: translateX(-50%);
  z-index: 100000;
  @include customMaxMQ (32rem) {
    left: 0;
    width: 100%;
    padding: $padding;
    padding-bottom: 0;
    transform: none;
  }
}
</style>
