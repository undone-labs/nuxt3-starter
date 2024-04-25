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
      id: zeroUuid().v4()
    })
    if (from === 'top') {
      toasts.value.unshift(entry)
    } else if (from === 'bottom') {
      toasts.value.push(entry)
    }
  }

  /**
   * @method removeMessage
   */

  const removeMessage = id => {
    const index = toasts.value.findIndex(obj => obj && obj.id === id)
    toasts.value.splice(index, 1)
  }

  // ==================================================================== return
  return {
    // ----- state
    toasts,
    // ----- actions
    addMessage,
    removeMessage
  }
})
