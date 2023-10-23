// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineStore } from 'pinia'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useZeroFormStore = defineStore('zero-form', () => {
  // ===================================================================== state
  const fields = ref({})
  const models = ref({})
  const savedStates = ref({})

  // =================================================================== actions

  /**
   * @method registerModel
   */

  const registerModel = (model) => {
    models.value[model.id] = model
  }

  /**
   * @method setField
   */

  const setField = (incoming) => {
    const field = fields.value[incoming.id]
    if (field) {
      Object.assign(field, incoming)
    }
    fields.value[incoming.id] = field || incoming
  }

  /**
   * @method removeField
   */

  const removeField = (id) => {
    delete fields.value[id]
  }

  /**
   * @method setFormSaveState
   */

  const setFormSaveState = (payload) => {
    savedStates.value[payload.id] = payload
  }

  /**
   * @method removeFormSaveState
   */

  const removeFormSaveState = (id) => {
    delete savedStates.value[id]
  }

  // ==================================================================== return
  return {
    // ----- state
    fields,
    models,
    savedStates,
    // ----- actions
    registerModel,
    setField,
    removeField,
    setFormSaveState,
    removeFormSaveState
  }
})
