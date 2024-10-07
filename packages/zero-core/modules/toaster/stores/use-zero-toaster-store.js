/**
 * @module useZeroToasterStore
 * @description A store for toast message data tracking. Allows 'toaster' messages to be conveniently added from anywhere within an app.
 */
// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineStore } from 'pinia'
import zeroUuid from '../../../composables/uuid'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useZeroToasterStore = defineStore('zero-toaster', () => {
  const config = useRuntimeConfig().public.toaster

  // ===================================================================== state
  /**
   * @member {Array} toasts
   * @kind ref
   * @desc An array of toast message objects containing message data and data about how the message should be displayed by the [toast and toaster components](/zero-core/modules/toaster/components). Each message object has the following structure:
   * ```js
   * {
   *   text: string, // toast message
   *   id: string, // automatically generated using the zeroUuid composable
   *   jingle: number, // automatically added, see the toast component for more info
   *   timeout: number, // how long the message should display in milliseconds
   *   from: string // the direction the toast should appear from, 'top' or 'bottom'
   * }
   * ```
   */
  const toasts = ref([])

  // =================================================================== actions

  /**
   * @method addMessage
   * @desc Add a message to be displayed with a [toast component](/zero-core/modules/toaster/components#zero-toast).
   * @param {Object} payload An object containing the message to display. The object should at least have the following text property but can additionally have any of the properties outlines above in [toasts](/zero-core/modules/toaster/store#toasts).
   * @param {string} payload.text The message to display.
   */

  const addMessage = payload => {
    const from = payload.from || config.from || 'top'
    const entry = Object.assign(payload, {
      id: zeroUuid().v4(),
      jingle: 0
    })
    const found = toasts.value.find(obj => obj.text === payload.text)
    if (found) {
      found.jingle++
    } else {
      if (from === 'top') {
        toasts.value.unshift(entry)
      } else if (from === 'bottom') {
        toasts.value.push(entry)
      }
    }
  }

  /**
   * @method removeMessage
   * @desc Removes a toast message object from the [toasts](/zero-core/modules/toaster/store#toasts) array.
   * @param {string} id The ID of the toast to remove.
   */

  const removeMessage = id => {
    const index = toasts.value.findIndex(obj => obj && obj.id === id)
    toasts.value.splice(index, 1)
  }

  /**
   * @method updateToast
   * @desc Updates a toast message object from the [toasts](/zero-core/modules/toaster/store#toasts) array.
   * @param {string} id The ID of the toast to update.
   * @param {Object} payload An object with properties and values to assign to the toast object in question. See [toasts](/zero-core/modules/toaster/store#toasts) for possible key-value pairs.
   */

  const updateToast = (id, payload) => {
    const found = toasts.value.find(obj => obj.id === id)
    Object.assign(found, payload)
  }

  // ==================================================================== return
  return {
    // ----- state
    toasts,
    // ----- actions
    addMessage,
    removeMessage,
    updateToast
  }
})
