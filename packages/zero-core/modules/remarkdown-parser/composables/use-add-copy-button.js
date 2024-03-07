// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
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
  node.children.splice( 0, 0, button)
  return node
}
