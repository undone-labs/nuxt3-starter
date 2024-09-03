// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { googleAuthCodeLogin } from 'vue3-google-login'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useAuthenticateGoogle = async () => {
  const authStore = useZeroAuthStore()
  const buttonStore = useZeroButtonStore()
  try {
    authStore.setAuthState('authenticating')
    const response = await googleAuthCodeLogin({ clientId: useRuntimeConfig().public.auth.google.clientId })
    const session = await useFetchAuth('/login', {
      method: 'post',
      query: Object.assign(response, { strategy: 'google' }),
      body: {}
    })
    useSetSession(session)
  } catch (e) {
    const loginFailed = e.message.includes('invalid_grant')
    if (loginFailed || e.type === 'popup_closed') {
      authStore.setAuthState('unauthenticated')
      buttonStore.setButton({ id: 'authenticate-google-oauth', loading: false })
    }
    if (loginFailed) {
      useToasterStore().addMessage({
        type: 'error',
        text: 'Something went wrong. Please try again.'
      })
    }
  }
}
