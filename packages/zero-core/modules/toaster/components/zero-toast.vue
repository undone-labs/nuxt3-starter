<template>
  <div class="toast-container">
    <!-- 
      @slot The content of the toast window.
        @binding toast Binds the 'toast' prop object to the slot.
    -->
    <slot name="toast" :toast="toast" />

  </div>
</template>

<script setup>
/**
 * @description A 'toast' component; a small window with a message for the user that pops up like toast out of a toaster. As soon as the component is mounted, the [unToast]() method is called which will automatically clear the toast after a set time interval.
 * Additionally, a watcher is set to watch the toast prop's `jingle` key. The jingle property is an integer value which represents the number of 'repeats' of the same message. If this value is greater than zero, the watcher will call the unToast method below and set a timeout to update the toast message jingle property to `0`. This functionality effectively extends the life of an existing toast message if that message is repeatedly added rather than creating multiple popup windows with the same message.
 */
// ======================================================================= Setup
const props = defineProps({
  /**
   * The toast object for this component instance that is held in the [toaster store](/zero-core/modules/toaster/store).
   */
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
 * @desc Sets a timer with a setTimeout function. Once the timer interval has elapsed, removes the toast message from view using the toaster store's [removeMessage](/zero-core/modules/toaster/store#removemessage) method. The time interval can be set in the nuxt.config.js file under `zero.modules.toaster.timeout` or it is derived from the toast prop's `.timeout` key.
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
