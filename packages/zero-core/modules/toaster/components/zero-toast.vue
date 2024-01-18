<template>
  <div :class="['toast', { unpopping } ]" :style="animationVariables">

    <slot name="toast" :toast="toast" />

  </div>
</template>

<script setup>
// ======================================================================= Setup
const props = defineProps({
  toast: {
    type: Object,
    required: true
  },
  toasterPadding: {
    type: String,
    required: false,
    default: '1rem'
  }
})

// ======================================================================== Data
const store = useZeroToasterStore()
const config = useRuntimeConfig().public.toaster
const unpopping = ref(false)
const toastTimeout = props.toast.timeout || config.timeout || 5000
const animationVariables = {
  '--toaster-padding': props.toasterPadding
}

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
  from { top: calc( -100% - var(--toaster-padding)); opacity: 0; }
  to { top: 0; opacity: 1; }
}

@keyframes unpoppingToast {
  from { top: 0; opacity: 1; }
  to { top: calc( -100% - var(--toaster-padding)); opacity: 0; }
}

// ///////////////////////////////////////////////////////////////////// General
.toast {
  --toaster-padding: 0rem;
  animation: poppingToast 250ms ease-in-out forwards;
  overflow: hidden;
  &.unpopping {
    animation: unpoppingToast 250ms ease-in-out forwards;
  }
}
</style>
