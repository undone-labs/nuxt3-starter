<template>
  <div :class="['alert', { open }]">

    <!--
      @slot The Alert contents to render as a modal.
        @binding {func} close-alert The component's [closeAlert](/zero-core/modules/alert/components#closealert) method.
        @binding {any} data The alert data associated with this component and stored in the [Alert store](/zero-core/modules/alert/store).
    -->
    <slot
      :close-alert="closeAlert"
      :data="data" />

  </div>
</template>

<script setup>
/**
 * @description This module uses the 'Alert' nomenclature in reference to the pop-up or modal-like nature of its component. It is a combination of a wrapper component (documented here) that renders its contents visible as a modal and a [store](/zero-core/modules/alert/store) which tracks the existence and states of all modals. Before the component mounts, it will register a tracking object with its own ID and closed state in the Alert store.
 */
// ===================================================================== imports
import { onKeyStroke } from '@vueuse/core'

// ======================================================================= setup
const props = defineProps({
  /**
   * An identifier for this Alert. Should be unique across all instances.
   */
  alertId: {
    type: String,
    required: true
  }
})

const alertStore = useZeroAlertStore()

alertStore.setAlert({
  id: props.alertId,
  status: 'closed'
})

const emit = defineEmits(['completed'])

// ======================================================================== data
const { alerts } = storeToRefs(alertStore)

// ==================================================================== computed
/**
 * @method alert
 * @computed
 * @desc - Returns the alert object associated with this component instance from the [Alert store](/zero-core/modules/alert/store#alerts).
 * @returns {Object}
 */
const alert = computed(() => alertStore.getAlert(props.alertId))

/**
 * @method open
 * @computed
 * @desc - Test indicating if this alert is currently open.
 * @returns {boolean}
 */
const open = computed(() => alert.value?.status === 'open')

/**
 * @method data
 * @computed
 * @desc - Returns data associated with this alert.
 * @returns {any}
 */
const data = computed(() => alert.value?.data)

// ======================================================================= hooks
onBeforeUnmount(() => {
  alertStore.removeAlert(props.alertId)
})

// ===================================================================== methods
/**
 * @method onKeyStroke
 * @desc - Closes this alert when `Escape` key is pressed by calling the Alert Store [closeAlert](/zero-core/modules/alert/store#closealert) method.
 */
onKeyStroke('Escape', () => {
  if (open.value) {
    closeAlert()
  }
})

/**
 * @method closeAlert
 * @desc - Closes this alert by calling the Alert Store [closeAlert](/zero-core/modules/alert/store#closealert) method.
 */
const closeAlert = () => {
  alertStore.closeAlert(props.alertId)
}
</script>
