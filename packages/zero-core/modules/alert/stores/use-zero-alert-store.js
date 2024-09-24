// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineStore } from 'pinia'

/**
 * @module useZeroAlertStore
 * @desc A store that registers [Alert component](/zero-core/modules/alert/components) instances, records their open/closed states and contains methods to update them.
 */

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useZeroAlertStore = defineStore('zero-alert', () => {
  // ===================================================================== state
  /**
   * @member {Object} alerts
   * @kind ref
   * @desc An object that maps alert IDs to nested tracking objects for each [Alert component](/zero-core/modules/alert/components) instance. The top level key referencing each nested alert object is that alert's AlertId.
   */
  const alerts = ref({})

  // =================================================================== actions

  /**
   * @method setAlert
   * @desc Register an alert instance.
   * @param {Object} payload A tracking object containing data about an alert instance.
   * @param {string} payload.id The Alert ID.
   * @param {string} payload.status The status of the alert; either `open` or `closed`.
   * @param {any} [payload.data] Data to associate with the alert.
   */

  const setAlert = payload => {
    alerts.value[payload.id] = payload
  }

  /**
   * @method getAlert
   * @desc Returns a single alert object stored at a key in the [alerts](#alerts) map.
   * @param {string} alertId The ID of the alert object to retrieve.
   * @returns {Object}
   */

  const getAlert = alertId => {
    return alerts.value[alertId]
  }

  /**
   * @method removeAlert
   * @desc Removes an alert mapping from the [alerts](#alerts) map.
   * @param {string} alertId The ID of the alert object to remove.
   */

  const removeAlert = alertId => {
    delete alerts.value[alertId]
  }

  /**
   * @method updateAlertData
   * @desc Updates the `data` key of an alert object.
   * @param {string} alertId The ID of the alert object to update.
   * @param {any} payload Data to save to the `data` key of the alert object.
   */

  const updateAlertData = (alertId, payload) => {
    alerts.value[alertId].data = payload
  }

  /**
   * @method openAlert
   * @desc Sets the status of an alert to 'open'.
   * @param {string} alertId The ID of the alert object to update.
   * @param {any} [data] Data to save to the `data` key of the alert object.
   */

  const openAlert = (alertId, data) => {
    Object.assign(alerts.value[alertId], {
      status: 'open',
      data
    })
  }

  /**
   * @method closeAlert
   * @desc Sets the status of an alert to 'closed'. Sets the alert's `data` key to `null`.
   * @param {string} alertId The ID of the alert object to update.
   */

  const closeAlert = alertId => {
    const alert = alerts.value[alertId]
    if (alert) {
      Object.assign(alert, {
        status: 'closed',
        data: null
      })
    }
  }

  // ==================================================================== return
  return {
    // ----- state
    alerts,
    // ----- actions
    setAlert,
    getAlert,
    removeAlert,
    updateAlertData,
    openAlert,
    closeAlert
  }
})
