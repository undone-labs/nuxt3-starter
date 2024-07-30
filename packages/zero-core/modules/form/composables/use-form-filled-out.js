// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { useZeroFormStore } from '../stores/use-zero-form-store'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useFormFilledOut = formId => {
  const store = useZeroFormStore()
  const fields = useGetFormFields(formId)
  const len = fields.length
  if (len === 0) { return false }
  let formFilledOut = true
  for (let i = 0; i < len; i++) {
    const field = fields[i]
    if (field.scaffold.required) {
      const validate = useValidateField(field)
      if (validate.state === 'error') {
        formFilledOut = false
      }
    }
  }
  return formFilledOut
}
