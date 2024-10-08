/**
 * @module useAddDataAttributes
 * @desc Adds data attributes to an HTML element.
 */
// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
/**
 * @method useAddDataAttributes
 * @param {HTMLElement} node The HTML element to add data attributes to.
 * @param {Object} attrs An object of key-value pairs to be assigned to element data attribute names and values respectively.
 * @returns {HTMLElement}
 */
export const useAddDataAttributes = (node, attrs = {}) => {
  node.properties = { ...node.properties, ...attrs}
  return node
}
