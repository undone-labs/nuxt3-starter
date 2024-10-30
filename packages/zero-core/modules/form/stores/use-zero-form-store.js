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
   * ---------------------------------------------------------------------------
   */

  const registerModel = payload => {
    models.value[payload.id] = payload
  }

  /**
   * @method updateModel
   * ---------------------------------------------------------------------------
   */

  const updateModel = payload => {
    Object.assign(models.value[payload.id], payload)
  }

  /**
   * @method removeModel
   * ---------------------------------------------------------------------------
   */

  const removeModel = id => {
    delete models.value[id]
  }

  /**
   * @method setField
   * ---------------------------------------------------------------------------
   */

  const setField = incoming => {
    const id = incoming.id
    let field = fields.value[id]
    if (field) {
      field = Object.assign({}, field, incoming)
    }
    if (!field && incoming.mounted === false) { return }
    fields.value[id] = field || incoming
  }

  /**
   * @method removeField
   * ---------------------------------------------------------------------------
   */

  const removeField = id => {
    delete fields.value[id]
  }

  /**
   * @method setFormSaveState
   * ---------------------------------------------------------------------------
   */

  const setFormSaveState = payload => {
    savedStates.value[payload.id] = payload
  }

  /**
   * @method removeFormSaveState
   * ---------------------------------------------------------------------------
   */

  const removeFormSaveState = id => {
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
    updateModel,
    removeModel,
    setField,
    removeField,
    setFormSaveState,
    removeFormSaveState
  }
})
