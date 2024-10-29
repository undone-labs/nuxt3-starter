// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default (string, len = 30, end = '...', type = 'single') => {
  if (type === 'single') {
    return string.length > len + 3 ? `${string.slice(0, len)}${end}` : string
  } else {
    return string.length > len + 3 ? `${string.slice(0, len)}${end}${string.slice(-len)}` : string
  }
}
