// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineNuxtPlugin } from '#imports'

// /////////////////////////////////////////////////////////////////// Functions
// -----------------------------------------------------------------------------

/**
 * @method listenToLogin
 * -----------------------------------------------------------------------------
 */

const listenToLogin = siteUrl => {
  if (process.client) {
    const buttonStore = useZeroButtonStore()
    const authStore = useZeroAuthStore()
    window.addEventListener('message', async e => {
      const data = e.data
      const id = data.id
      const allowedOriginIds = [
        'authenticate-github-oauth',
        'authenticate-github-app',
        'authenticate-microsoft'
      ]
      if (e.origin !== siteUrl || !data || !id) { return }
      if (id === 'authentication-failed' && data.message) {
        useZeroToasterStore().addMessage({
          type: 'error',
          text: data.message
        })
        authStore.setAuthState('unauthenticated')
      }
      if (allowedOriginIds.includes(id) && data.hasOwnProperty('session')) {
        useSetSession(data.session)
      }
      if (data.action === 'close-popup') {
        if (authStore.authState === 'authenticating') {
          authStore.setAuthState('unauthenticated')
        }
      }
      zeroLs().remove('state')
      zeroLs().remove('code_verifier')
      buttonStore.setButton({ id: 'authenticate-github-oauth', loading: false })
      buttonStore.setButton({ id: 'authenticate-github-app', loading: false })
      buttonStore.setButton({ id: 'authenticate-microsoft-oauth', loading: false })
    }, false)
  }
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  listenToLogin(config.public.siteUrl)
})
