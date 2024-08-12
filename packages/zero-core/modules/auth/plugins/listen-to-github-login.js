// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineNuxtPlugin } from '#imports'

// /////////////////////////////////////////////////////////////////// Functions
// -----------------------------------------------------------------------------
// ///////////////////////////////////////////////////////// listenToGithubLogin
const listenToGithubLogin = siteUrl => {
  if (process.client) {
    const buttonStore = useZeroButtonStore()
    const authStore = useZeroAuthStore()
    window.addEventListener('message', async (e) => {
      const data = e.data
      if (e.origin !== siteUrl || !data) { return }
      const id = data.id
      if ((id === 'authenticate-github-oauth' || id === 'authenticate-github-app') && data.hasOwnProperty('session')) {
        useSetSession(data)
      }
      if (id === 'authenticate-github' && data.action === 'close-popup') {
        if (authStore.authState === 'authenticating') {
          authStore.setAuthState('unauthenticated')
        }
      }
      buttonStore.setButton({ id: 'authenticate-github-oauth', loading: false })
    }, false)
  }
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  listenToGithubLogin(config.public.siteUrl)
})
