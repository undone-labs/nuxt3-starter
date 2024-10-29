/**
 * @module useAddCopyButton
 * @desc Creates and appends a 'copy' button to an HTML element. The button is furnished with properties regarding the type of element it is to be appended to, a tooltip message and, in the case of heading nodes, a URL hash derived from the heading ID.
 */
// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
/**
 * @method useAddCopyButton
 * @param {HTMLElement} node An HTML element to append a copy button to.
 * @param {string} id The element ID of the node if it is a heading node. 
 * @returns {HTMLElement}
 */
export const useAddCopyButton = (node, id = false) => {
  const headingProperties = {
    className: ['copy-button'],
    'data-type': 'heading',
    'data-hash': id,
    'data-tooltip': 'Click to copy link'
  }
  const codeProperties = {
    className: ['copy-button'],
    'data-type': 'code'
  }
  const button = {
    type: 'element',
    tagName: 'button',
    properties: id ? headingProperties : codeProperties,
    children: [{ type: 'text', value: id ? '#' : 'Copy' }]
  }
  node.children.splice(0, 0, button)
  return node
}
