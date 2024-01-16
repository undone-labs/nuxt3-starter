// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import zeroUuid from '../../../composables/uuid'
import { defineStore } from 'pinia'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useZeroToasterStore = defineStore('zero-toaster', () => {
  // ===================================================================== state
  const messages = ref([])

  // =================================================================== actions

  /**
   * @method addMessage
   */

  const addMessage = payload => {
    const config = useRuntimeConfig().public.toaster
    const len = messages.value.length
    const display = config.display
    payload.id = zeroUuid().v4()
    messages.value.push(payload)
    if (len >= display) {
      removeMessage(messages.value[len - display].id)
    }
    return payload.id
  }

  /**
   * @method removeMessage
   */

  const removeMessage = id => {
    const index = messages.value.findIndex(obj => obj && obj.id === id)
    messages.value.splice(index, 1)
  }

  /**
   * @method replaceMessage
   */

  const replaceMessage = payload => {
    const id = payload.id
    const toast = payload.toast
    const index = messages.value.findIndex(obj => obj && obj.id === id)
    if (index !== -1) {
      messages.value.splice(payload.index, 1, payload.toast)
    }
    return id
  }

  // ==================================================================== return
  return {
    // ----- state
    messages,
    // ----- actions
    addMessage,
    removeMessage,
    replaceMessage
  }
})
