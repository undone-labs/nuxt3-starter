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
      if (e.origin !== siteUrl || !data) { return }
      if ((data.id === 'authenticate-github-oauth' || data.id === 'authenticate-github-app') && data.hasOwnProperty('session')) {
        useSetSession(data)
      }
      if (data.id === 'connect-github-repo') {
        let state
        if (data.action === 'close-popup') { state = 'idle' }
        if (data.action === 'finalizing') { state = 'finalizing' }
        if (state) {
          useProjectStore().setConnectRepoLoadingState(state)
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
