/**
 * @module useAddCssSelectors
 * @desc Adds classes to a provided HTML element.
 */
// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
/**
 * @method useAddCssSelectors
 * @param {HTMLElement} node The HTML element to append classes to.
 * @param {string} id The ID of the element. 
 * @param {string} classes The classes to add to append to the element's classlist. If multiple classes are to be added, they should be delimited by a space character. 
 * @returns {HTMLElement}
 */
export const useAddCssSelectors = (node, id = null, classes = '') => {
  if (id) { node.properties = { ...node.properties, id } }
  if (classes.length > 0) {
    node.properties?.className
    ? node.properties.className = `${node.properties.className} ${classes}`
    : node.properties.className = classes
  }
  return node
}
