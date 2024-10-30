// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import zeroUuid from '@/../zero-core/composables/uuid'

// /////////////////////////////////////////////////////////////////// Functions
// -----------------------------------------------------------------------------

/**
 * @method googleOauthSuccess
 * -----------------------------------------------------------------------------
 * @desc This method is called if Google oauth is successful
 */

const googleOauthSuccess = async response => {
  const state = zeroLs().get('state')
  if (state !== response.state) {
    googleOauthError({ message: 'State does not match' })
    return
  }
  const session = await useFetchAuth('/login', {
    method: 'post',
    query: Object.assign(response, {
      strategy: 'google'
    })
  })
  useSetSession(session)
}

/**
 * @method googleOauthError
 * -----------------------------------------------------------------------------
 * @desc This method is called if Google oauth returns an error or if the popup
 * was closed prematurely
 */

const googleOauthError = e => {
  useZeroAuthStore().setAuthState('unauthenticated')
  useZeroButtonStore().setButton({ id: 'authenticate-google-oauth', loading: false })
  const failureConditions = ['invalid_grant', 'State does not match']
  const loginFailed = failureConditions.some(substr => e.message && e.message.includes(substr))
  if (loginFailed) {
    useZeroToasterStore().addMessage({
      type: 'error',
      text: 'Something went wrong. Please try again.'
    })
  }
  zeroLs().remove('state')
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useAuthenticateGoogle = () => {
  const state = zeroUuid().v4()
  zeroLs().set('state', state)
  useZeroAuthStore().setAuthState('authenticating')
  window.google.accounts.oauth2.initCodeClient({
    client_id: useRuntimeConfig().public.auth.google.clientId,
    scope: 'email profile openid',
    ux_mode: 'popup',
    state,
    callback: googleOauthSuccess,
    error_callback: googleOauthError
  }).requestCode()
}
