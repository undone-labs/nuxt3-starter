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
const toastTimer = ref(null)

// ===================================================================== Methods
/**
 * @method unToast
 */

const unToast = () => {
  toastTimer.value = setTimeout(() => {
    toasterStore.removeMessage(props.toast.id)
    clearTimeout(toastTimer.value)
  }, toastTimeout)
}

// ======================================================================== Data
watch(() => props.toast.jingle, jingle => {
  if (jingle > 0) {
    clearTimeout(toastTimer.value)
    unToast()
    setTimeout(() => {
      toasterStore.updateToast(props.toast.id, {
        jingle: 0
      })
    }, 100)
  }
})

// ======================================================================= Hooks
onMounted(() => {
  unToast()
})
</script>
