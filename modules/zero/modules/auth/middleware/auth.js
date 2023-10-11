// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { useZeroAuthStore } from '@/modules/zero/modules/auth/stores/use-zero-auth-store'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp()
  const { public: { auth: authConfig } } = useRuntimeConfig()
  const redirectUnauthenticated = authConfig.redirectUnauthenticated === '' ? null : authConfig.redirectUnauthenticated
  // const redirectAfterLogin = authConfig.redirectAfterLogin === '' ? null : authConfig.redirectAfterLogin
  // const redirectAfterLogout = authConfig.redirectAfterLogout === '' ? null : authConfig.redirectAfterLogout
  try {
    const headers = useRequestHeaders(['cookie'])
    const meta = to.meta
    const guarded = meta.guarded
    if (meta.hasOwnProperty('authenticate') && !meta.authenticate) { return }
    const store = useZeroAuthStore(nuxtApp.$pinia)
    const account = store.account
    const { data } = await useFetch('/api/authenticate', { headers, query: { guarded } })
    const authenticated = data.value
    if (authenticated) {
      store.setSession(authenticated)
      if (!account) {
        store.getAccount(authenticated.userId)
      }
    }
    if (guarded && !authenticated) {
      if (!redirectUnauthenticated) { return abortNavigation('Looks like the page you\'re looking for doesn\'t exist') }
      return navigateTo(redirectUnauthenticated)
    }
  } catch (e) {
    if (!redirectUnauthenticated) {
      return showError({
        statusCode: 404,
        message: e.message,
        data: {
          from: from.path
        }
      })
    }
    return navigateTo(redirectUnauthenticated)
  }
})
