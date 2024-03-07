// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useAddCopyButton = (node, id = null) => {
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
    children: [{ type: 'text', value: '#' }]
  }
  node.children.splice( 0, 0, button)
  return node
}
