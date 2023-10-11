// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineStore } from 'pinia'
import { ref } from '#imports'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useZeroButtonStore = defineStore('zero-button', () => {
  // ===================================================================== state
  const buttons = ref({})

  // =================================================================== actions

  /**
   * @method setButton
   */

  const setButton = (payload) => {
    buttons.value[payload.id] = payload
  }

  /**
   * @method removeButton
   */

  const removeButton = (id) => {
    delete buttons.value[id]
  }

  // ==================================================================== return
  return {
    // ----- state
    buttons,
    // ----- actions
    setButton,
    removeButton
  }
})
