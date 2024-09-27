/**
 * @module zeroUuid
 * @desc A convenience wrapper for generating universal unique identifiers using Uuid. Imports the following methods from Uuid and exposes them in the object returned by zeroUuid():
 * - `NIL`
 * - `parse`
 * - `stringify`
 * - `v1`
 * - `v3`
 * - `v4`
 * - `v5`
 * - `validate`
 * - `version`
 * See [Uuid](https://github.com/uuidjs/uuid) for documentation of each method. 
 */
// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import {
  NIL as NIL,
  parse as parse,
  stringify as stringify,
  v1 as v1,
  v3 as v3,
  v4 as v4,
  v5 as v5,
  validate as validate,
  version as version
} from 'uuid'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
/**
 * @method zeroUuid
 */

export default () => {
  return {
    NIL,
    parse,
    stringify,
    v1,
    v3,
    v4,
    v5,
    validate,
    version
  }
}
