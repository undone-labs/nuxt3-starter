// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { useRegisterField } from './use-register-field'
import { useZeroFormStore } from '../stores/use-zero-form-store'

// ////////////////////////////////////////////////////////////////// [Class] Ls
// -----------------------------------------------------------------------------
class Field {
  // =============================================================== constructor
  constructor (store) {
    this.store = store
  }

  // ======================================================================= get
  get (id) {
    return this.store.fields[id]
  }

  // ======================================================================= get
  set (payload) {
    return this.store.setField(payload)
  }

  // ==================================================================== remove
  remove (id) {
    return this.store.removeField(id)
  }

  // ======================================================================= set
  reset (id) {
    const field = this.get(id)
    if (field) {
      this.store.setField(useRegisterField(
        id,
        field.formId,
        field.scaffold,
        field.validate
      ))
    }
  }

  // ======================================================================= set
  resetOriginalValue (id, newOriginalValue) {
    const field = this.get(id)
    this.store.setField({
      id,
      originalValue: newOriginalValue,
      scaffold: Object.assign({}, field.scaffold, {
        defaultValue: newOriginalValue
      })
    })
  }
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useField = () => {
  const store = useZeroFormStore()
  return new Field(store)
}
