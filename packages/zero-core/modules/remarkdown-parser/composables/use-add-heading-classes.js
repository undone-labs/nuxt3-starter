// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useAddHeadingClasses = (node, id) => {
  node.properties = { ...node.properties, id }
  Array.isArray(node.properties.className)
  ? node.properties.className.push('heading-anchor')
  : node.properties.className = ['heading-anchor' ]
  return node
}
