// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { useZeroFormStore } from '@/modules/zero/modules/form/stores/use-zero-form-store'

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
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useField = () => {
  const store = useZeroFormStore()
  return new Field(store)
}
