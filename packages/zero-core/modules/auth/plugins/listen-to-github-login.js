// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineNuxtPlugin } from '#imports'

// /////////////////////////////////////////////////////////////////// Functions
// -----------------------------------------------------------------------------
// ///////////////////////////////////////////////////////// listenToGithubLogin
const listenToGithubLogin = siteUrl => {
  if (process.client) {
    const buttonStore = useZeroButtonStore()
    window.addEventListener('message', async (e) => {
      const data = e.data
      if ((e.origin !== siteUrl) || !data || data.action !== 'github-oauth-authenticated' && data.action !== 'close-popup') { return }
      if (data.id === 'authenticate-github-oauth' && data.hasOwnProperty('session')) {
        useSetSession(data)
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
