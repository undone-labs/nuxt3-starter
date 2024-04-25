<template>
  <div class="toast-container">

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
const toasterStore = useZeroToasterStore()
const config = useRuntimeConfig().public.toaster
const toastTimeout = props.toast.timeout || config.timeout || 5000

// ======================================================================= Hooks
onMounted(async () => {
  const timeout = setTimeout(() => {
    toasterStore.removeMessage(props.toast.id)
    clearTimeout(timeout)
  }, toastTimeout)
})
</script>
