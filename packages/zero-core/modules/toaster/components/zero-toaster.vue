<template>
  <div :class="['toaster', `from-${from}`]">

    <transition-group :name="`toast-slide-in__${from}`">
      <ZeroToast
        v-for="toast in toasts"
        :key="toast.id"
        :toast="toast">

        <template #toast="{ toast }">
          <!-- 
            @slot The content of the toast window.
              @binding toast Binds the toast object that is bound to the child toast component slot. This will be the same object passed as the 'toast' prop to the [toast component](/zero-core/modules/toaster/components#zero-toast).
          -->
          <slot name="toast" :toast="toast" />

        </template>

      </ZeroToast>
    </transition-group>

  </div>
</template>

<script setup>
/**
 * @description The Zero Toaster is a component that displays important info/messages to the user in small alert windows called 'toasts'. The name is a reference the way that alert messages pop up like toast out of a toaster. This component, the 'toaster', renders the individual [toast](/zero-core/modules/toaster/components#zero-toast) components that display a message to the user and allows for multiple messages to be displayed at once.
 * Uses a Vue [transition-group](https://vuejs.org/guide/built-ins/transition-group) to animate toast component entry and exit.
 */
// ======================================================================= Setup
const props = defineProps({
  /**
   * Defines the direction which 'toast' windows should enter from relative to the viewport. Overrides the module setting set in the `nuxt.config.js` under `zero.modules.toaster`.
   * @values top, bottom
   */
  from: {
    type: String,
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
