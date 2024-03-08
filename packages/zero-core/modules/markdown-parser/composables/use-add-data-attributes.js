// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useAddDataAttributes = (node, attrs = {}) => {
  node.properties = { ...node.properties, ...attrs}
  return node
}
