/**
 * @module useZeroButtonStore
 * @description A store for tracking [button](/zero-core/modules/button/components) component loading states.
 */
// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineStore } from 'pinia'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useZeroButtonStore = defineStore('zero-button', () => {
  // ===================================================================== state
  /**
   * @member {Object} buttons
   * @kind ref
   * @desc An object containing nested objects representing individual button instances. Each nested object exists at the root level of this object, has a key corresponding to its button ID and should be of the following structure:
   * ```js
   * {
   *   id: string,
   *   loading: boolean
   * }
   * ```
   */
  const buttons = ref({})

  // =================================================================== actions

  /**
   * @method setButton
   * @desc Sets a tracking object in the [buttons object](/zero-core/modules/button/store#buttons) to the incoming payload. The key used to reference this tracking object is the button ID.
   * @param {Object} payload The tracking object to add.
   * @param {string} payload.id The ID of the button to track.
   * @param {boolean} payload.loading A boolean indicating whether or not this button is loading.
   */

  const setButton = payload => {
    buttons.value[payload.id] = payload
  }

  /**
   * @method removeButton
   * @desc Removes a tracking object from the [buttons object](/zero-core/modules/button/store#buttons).
   * @param {string} id The ID of the button to remove.
   */

  const removeButton = id => {
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
