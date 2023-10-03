// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useUnSlugify = (slug, type = 'proper-case') => {
  if (type === 'proper-case') {
    return slug
      .toLowerCase()
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')
  } else if (type === 'camel-case') {
    return slug
      .toLowerCase()
      .split('-')
      .map((word, i) => i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
      .join('')
  } else {
    return 'Incompatible "Type" specified. Must be type "proper-case" or "camel-case". Default is "proper-case"'
  }
}
