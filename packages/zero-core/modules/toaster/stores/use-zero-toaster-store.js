// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineStore } from 'pinia'
import zeroUuid from '../../../composables/uuid'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useZeroToasterStore = defineStore('zero-toaster', () => {
  const config = useRuntimeConfig().public.toaster

  // ===================================================================== state
  const toasts = ref([])

  // =================================================================== actions

  /**
   * @method addMessage
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
   */

  const removeMessage = id => {
    const index = toasts.value.findIndex(obj => obj && obj.id === id)
    toasts.value.splice(index, 1)
  }

  /**
   * @method updateToast
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
