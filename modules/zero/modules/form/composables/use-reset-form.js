// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { useZeroFormStore } from '@/modules/zero/modules/form/stores/use-zero-form-store'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useResetForm = (formId) => {
  const store = useZeroFormStore()
  const fields = store.fields.filter(field => field.formId === formId)
  const len = fields.length
  for (let i = 0; i < len; i++) {
    useField().reset(fields[i].id)
  }
}
