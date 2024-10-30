// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useExportForm = formId => {
  const data = {}
  const fields = useGetFormFields(formId)
  fields.forEach(field => {
    if (!field.modelKey) { console.error(`Form field id="${field.id}" modelKey is missing`) }
    data[field.modelKey] = field.value
  })
  return data
}
