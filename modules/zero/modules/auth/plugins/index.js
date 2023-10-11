// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineNuxtPlugin } from '#imports'
import { useZeroAuthStore } from '@/modules/zero/modules/auth/stores/use-zero-auth-store'
import { useZeroButtonStore } from '@/modules/zero/modules/button/stores/use-zero-button-store'

// /////////////////////////////////////////////////////////////////// Functions
// -----------------------------------------------------------------------------
// /////////////////////////////////////////////////////////////// listenToLogin
const listenToLogin = (config) => {
  return new Promise((next) => {
    if (process.client) {
      window.addEventListener('message', async (e) => {
        const data = e.data
        if ((e.origin !== config.public.siteUrl) || !data || e.source.name !== 'login-popup') { return }
        if (typeof data === 'object' && data.hasOwnProperty('session')) {
          const authStore = useZeroAuthStore()
          const buttonStore = useZeroButtonStore()
          const session = data.session
          authStore.setSession(session)
          buttonStore.setButton({ id: 'zero-authentication-login', loading: false })
          await authStore.getAccount(session.userId)
          // app.$toaster.add(data.toast)
          // const redirectTo = $config.redirectAfterLogin
          // if (redirectTo) {
          //   app.router.push(redirectTo.path)
          // }
        }
      }, false)
    }
    next()
  })
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  listenToLogin(config)
})
