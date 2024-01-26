<template>
  <div
    ref="toastRef"
    :class="['toast', { 'fade-out': fadeOut } ]"
    :style="animationVariables">

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
  toasterHeightInitial: {
    type: Number,
    required: true
  },
  toasterHeightFinal: {
    type: Number,
    required: true
  }
})

// ======================================================================== Data
const store = useZeroToasterStore()
const config = useRuntimeConfig().public.toaster
const toastTimeout = 1000 // props.toast.timeout || config.timeout || 5000

const toastRef = ref(null)
const animationVariables = ref({})
const fadeOut = ref(false)

// ==================================================================== Computed
const animateIn = computed(() => props.toast.animate === 'in')
const animateOut = computed(() => props.toast.animate === 'out')

// ======================================================================= Watch
watch(() => props.toasterHeightFinal, final => {
  animationVariables.value['--toast-initial-offset'] = `${Math.floor(-final) + Math.floor(props.toasterHeightInitial)}px`
})

// ======================================================================= Hooks
onMounted(async () => {
  const timeout = setTimeout(() => {
    console.log('❌', props.toast.id)
    fadeOut.value = true
    // store.hideMessage(props.toast.id)
    clearTimeout(timeout)
  }, toastTimeout)
})
</script>

<style lang="scss" scoped>
// @keyframes fadeOut {
//   to {
//     opacity: 0;
//   }
// }

@keyframes slideIn {
  from {
    transform: translateY(var(--toast-initial-offset));
  }
  to {
    transform: translateY(0);
  }
}

// ///////////////////////////////////////////////////////////////////// General
.toast {
  position: relative;
  pointer-events: none;
  animation: slideIn 300ms ease forwards;
  &.fade-out {
    transition: opacity 100ms;
    opacity: 0;
  }
}
</style>
