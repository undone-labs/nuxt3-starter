// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import zeroLs from '@/../zero-core/composables/ls'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const usePKCEGenerateCodeVerifier = () => {
  const array = new Uint32Array(32)
  window.crypto.getRandomValues(array)
  const codeVerifier = Array.from(array, dec => {
    return ('0' + dec.toString(16)).substr(-2) // decimal to hex conversion
  }).join('')
  zeroLs().set('code_verifier', codeVerifier)
  return codeVerifier
}
