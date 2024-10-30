// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const usePKCEGenerateCodeChallenge = async codeVerifier => {
  // Hash the code verifier
  const encoder = new TextEncoder()
  const data = encoder.encode(codeVerifier)
  const digest = await window.crypto.subtle.digest('SHA-256', data)
  // Base64-encode the digest to generate code challenge
  let str = ''
  const bytes = new Uint8Array(digest)
  const len = bytes.byteLength
  for (var i = 0; i < len; i++) {
    str += String.fromCharCode(bytes[i])
  }
  return btoa(str)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
}
