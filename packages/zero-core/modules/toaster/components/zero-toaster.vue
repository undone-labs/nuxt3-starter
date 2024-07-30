<template>
  <div :class="['toaster', `from-${from}`]">

    <transition-group :name="`toast-slide-in__${from}`">
      <ZeroToast
        v-for="toast in toasts"
        :key="toast.id"
        :toast="toast">

        <template #toast="{ toast }">
          <slot name="toast" :toast="toast" />
        </template>

      </ZeroToast>
    </transition-group>

  </div>
</template>

<script setup>
// ======================================================================= Setup
const props = defineProps({
  from: {
    type: [String, Object],
    required: false,
    default: null
  }
})

// ======================================================================== Data
const store = useZeroToasterStore()
const { toasts } = storeToRefs(store)
const config = useRuntimeConfig().public.toaster
const from = props.from || config.from || 'top'
</script>

<style lang="scss" scoped>
$padding: 1rem;

// ///////////////////////////////////////////////////////////////////// General
.toaster {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: fixed;
  z-index: 100000;
  &.from-top {
    top: $padding;
    left: 50%;
    transform: translateX(-50%);
  }
  &.from-bottom {
    bottom: $padding;
    left: 50%;
    transform: translateX(-50%);
  }
}

/**
 * 💡 these animations should be edited in an external stylesheet and will
 * require the use of `!important`
 */

.toast-slide-in__top {
  &-move,
  &-enter-active,
  &-leave-active {
    transition: all 0.5s ease;
  }
  &-enter-from {
    opacity: 0;
    transform: translateY(-2rem);
  }
  &-leave-to {
    opacity: 0;
  }
}

.toast-slide-in__bottom {
  &-move,
  &-enter-active,
  &-leave-active {
    transition: all 0.5s ease;
  }
  &-enter-from {
    opacity: 0;
    transform: translateY(2rem);
  }
  &-leave-to {
    opacity: 0;
  }
}
</style>
