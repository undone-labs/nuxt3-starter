// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useAddCssSelectors = (node, id = null, classes = '') => {
  if (id) { node.properties = { ...node.properties, id } }
  if (classes.length > 0) {
    node.properties?.className
    ? node.properties.className = `${node.properties.className} ${classes}`
    : node.properties.className = classes
  }
  return node
}
