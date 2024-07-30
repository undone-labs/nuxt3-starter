<template>
  <div :class="['alert', { open }]">

    <slot
      :close-alert="closeAlert"
      :data="data" />

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
const alert = computed(() => alertStore.getAlert(props.alertId))
const open = computed(() => alert.value?.status === 'open')
const data = computed(() => alert.value?.data)

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
