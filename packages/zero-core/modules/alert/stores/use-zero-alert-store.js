// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineStore } from 'pinia'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useZeroAlertStore = defineStore('zero-alert', () => {
  // ===================================================================== state
  const baseAlert = ref({
    isOpen: false, // boolean
    completed: null, // boolean if alert has been opened, otherwise null
    data: false // object
  })
  const alerts = ref({})

  // =================================================================== actions

  /**
   * @method setAlert
   */
  const setAlert = (alert) => {
    alerts.value[alert.alertId] = alert
  }

  /**
   * @method removeAlert
   */
  const removeAlert = (alertId) => {
    delete alerts.value[alertId]
  }

  /**
   * @method updateAlert
   */
  const updateAlert = (alert) => {
    console.log('updating alert ', alert)
    const alertId = alert.alertId
    if (alerts.value[alertId]) { alerts.value[alertId] = {...alerts.value[alertId], ...alert} }
  }

  /**
   * @method openAlert
   */
  const openAlert = (alertId) => {
    updateAlert({ alertId, isOpen: true })
  }

  /**
   * @method closeAlert
  */
 const closeAlert = (alert) => {
    updateAlert({ ...alert, isOpen: false })
  }

  /**
   * @method getAlertStatus
   */
  const getAlertStatus = (alertId) => {
    return {
      isOpen: alerts.value[alertId].isOpen,
      completed: alerts.value[alertId].completed
    }
  }

  // ==================================================================== return
  return {
    // ----- state
    baseAlert,
    alerts,
    // ----- actions
    setAlert,
    removeAlert,
    updateAlert,
    openAlert,
    closeAlert,
    getAlertStatus
  }
})
