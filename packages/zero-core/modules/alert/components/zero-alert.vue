<template>
  <div :class="['alert', { open }]">

    <slot :close-alert="closeAlert" />

  </div>
</template>

<script setup>
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
  id: props.alertId,
  status: 'closed'
})

// ======================================================================== Data
const { alerts } = storeToRefs(alertStore)

// ==================================================================== Computed
const open = computed(() => alertStore.getAlert(props.alertId) === 'open')

// ======================================================================= Hooks
onBeforeUnmount(() => {
  alertStore.removeAlert(props.alertId)
})

// ===================================================================== Methods
/**
 * @method closeAlert
 */
const closeAlert = () => {
  alertStore.closeAlert(props.alertId)
}
</script>
