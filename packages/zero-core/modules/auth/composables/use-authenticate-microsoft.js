// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import zeroOpenPopup from '@/../zero-core/composables/open-popup'
import zeroUuid from '@/../zero-core/composables/uuid'
import { usePKCEGenerateCodeVerifier } from './use-pkce-generate-code-verifier'
import { usePKCEGenerateCodeChallenge } from './use-pkce-generate-code-challenge'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useAuthenticateMicrosoft = async options => {
  const config = useRuntimeConfig().public.auth.microsoft
  const state = zeroUuid().v4()
  zeroLs().set('state', state)
  const codeVerifier = usePKCEGenerateCodeVerifier()
  const codeChallenge = await usePKCEGenerateCodeChallenge(codeVerifier)
  zeroOpenPopup({
    id: 'authenticate-microsoft',
    url: `
      https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/authorize?
      client_id=${config.clientId}
      &response_type=code
      &redirect_uri=${config.redirectUri}
      &response_mode=query
      &scope=https://graph.microsoft.com/User.Read
      &state=${state}
      &code_challenge=${codeChallenge}
      &code_challenge_method=S256
    `,
    title: 'authenticate-microsoft-popup',
    w: 600,
    h: 600
  })
}
