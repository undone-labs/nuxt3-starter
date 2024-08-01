// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useExportForm = formId => {
  const data = {}
  const fields = useGetFormFields(formId)
  fields.forEach(field => {
    data[field.modelKey] = field.value
  })
  return data
}
