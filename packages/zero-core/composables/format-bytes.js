// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
import { filesize } from 'filesize'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default (bytes, format = 'string') => {
  const size = filesize(bytes, { round: 2 })
  if (format === 'string') { return size }
  const split = size.split(' ')
  return { value: split[0], unit: split[1] }
}
