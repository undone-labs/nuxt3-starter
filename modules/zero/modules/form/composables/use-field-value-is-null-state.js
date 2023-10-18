// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useFieldValueIsNullState = (field) => {
  const scaffold = field.scaffold
  const type = scaffold.type
  const value = field.value
  let state = false
  switch (type) {
    case 'checkbox' : state = value === -1; break
    case 'radio' : state = value === -1; break
    case 'select' : state = value.length === 0; break
    case 'range' : state = value === scaffold.min; break
    default : state = value === ''; break
  }
  return state
}
