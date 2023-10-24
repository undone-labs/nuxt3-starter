// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { useZeroFormStore } from '@/modules/zero/modules/form/stores/use-zero-form-store'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useValidateForm = (formId) => {
  const store = useZeroFormStore()
  const fields = store.fields.filter(field => field.formId === formId)
  const len = fields.length
  let formValid = true
  for (let i = 0; i < len; i++) {
    const field = fields[i]
    if (field.validate && field.mounted && (field.state === 'error' || field.originalState === 'error')) {
      formValid = false
      store.setField(Object.assign({
        id: field.id,
        state: 'error',
        originalState: 'error',
        validation: field.originalValidation
      }))
    }
  }
  return formValid
}
