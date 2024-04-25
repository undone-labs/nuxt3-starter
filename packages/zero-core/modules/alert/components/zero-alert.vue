<template>
  <!-- parent HTML element needs to be the containing block to component for
       styling to work as expected -->
  <div :class="['alert', { open }]">

    <slot :accepted="accepted" :rejected="rejected" />

  </div>
</template>
<script setup>
// ===================================================================== Imports
import { storeToRefs } from 'pinia'

// ======================================================================= Props
const props = defineProps({
  alertId: {
    type: String,
    required: true
  }
})

// ======================================================================= Setup
const emit = defineEmits(['completed'])
const alertStore = useZeroAlertStore()
alertStore.setAlert({
  alertId: props.alertId,
  isOpen: false
})

// ======================================================================== Data
const { alerts } = storeToRefs(alertStore)

// ==================================================================== Computed
const open = computed(() => alerts.value ? alerts.value[props.alertId].isOpen : null)

// ======================================================================= Hooks
onBeforeUnmount(() => {
  alertStore.removeAlert(props.alertId)
})

// ===================================================================== Methods
/**
 * @method accepted
 */
const accepted = () => {
  emit('completed', true)
  alertStore.closeAlert({ alertId: props.alertId, completed: true })
}

/**
 * @method rejected
 */
const rejected = () => {
  emit('completed', false)
  alertStore.closeAlert({ alertId: props.alertId, completed: false })
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.alert {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateY(-100%);
  transition: 150ms ease-in;
  &.open {
    transform: translateY(0%);
  }
}
</style>
