<template>
  <div :class="['toast', { unpopping } ]">

    <slot name="toast" :toast="toast" />

  </div>
</template>

<script setup>
// ======================================================================= Setup
const props = defineProps({
  toast: {
    type: Object,
    required: true
  }
})

// ======================================================================== Data
const store = useZeroToasterStore()
const config = useRuntimeConfig().public.toaster
const unpopping = ref(false)
const toastTimeout = props.toast.timeout || config.timeout || 5000

// ======================================================================= Hooks
onMounted(() => {
  initializeToastUnpop()
})

// ===================================================================== Methods
const initializeToastUnpop = () => {
  const unpopTimeout = toastTimeout - 250
  if (toastTimeout !== Infinity) {
    const timeout = setTimeout(() => {
      store.removeMessage(props.toast.id)
      clearTimeout(timeout)
    }, toastTimeout)
    const unpop = setTimeout(() => {
      unpopping.value = true
      clearTimeout(unpop)
    }, unpopTimeout)
  }
}
</script>

<style lang="scss" scoped>
@keyframes poppingToast {
  from { top: -6rem; opacity: 0; }
  to { top: 0; opacity: 1; }
}

@keyframes unpoppingToast {
  from { top: 0; opacity: 1; }
  to { top: -6rem; opacity: 0; }
}

// ///////////////////////////////////////////////////////////////////// General
.toast {
  animation: poppingToast 250ms ease-in-out forwards;
  overflow: hidden;
  &.unpopping {
    animation: unpoppingToast 150ms ease-in-out forwards;
  }
}
</style>
