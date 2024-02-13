// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineStore } from 'pinia'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useZeroAlertStore = defineStore('zero-alert', () => {
  // ===================================================================== state
  const alerts = ref({})

  // =================================================================== actions

  /**
   * @method setAlert
   */

  const setAlert = payload => {
    alerts.value[payload.id] = payload.status
  }

  /**
   * @method getAlert
   */

  const getAlert = alertId => {
    return alerts.value[alertId]
  }

  /**
   * @method removeAlert
   */

  const removeAlert = alertId => {
    delete alerts.value[alertId]
  }

  /**
   * @method openAlert
   */

  const openAlert = alertId => {
    alerts.value[alertId] = 'open'
  }

  /**
   * @method closeAlert
   */

  const closeAlert = alertId => {
    alerts.value[alertId] = 'closed'
  }

  // ==================================================================== return
  return {
    // ----- state
    alerts,
    // ----- actions
    setAlert,
    getAlert,
    removeAlert,
    openAlert,
    closeAlert
  }
})
