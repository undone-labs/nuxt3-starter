// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { useZeroAuthStore } from '../stores/use-zero-auth-store'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp()
  const { public: { auth: authConfig } } = useRuntimeConfig()
  const redirectUnauthenticated = authConfig.redirectUnauthenticated === '' ? null : authConfig.redirectUnauthenticated
  const store = useZeroAuthStore(nuxtApp.$pinia)
  try {
    const headers = useRequestHeaders(['cookie'])
    const meta = to.meta
    const guarded = meta.guarded
    if (meta.hasOwnProperty('authenticate') && !meta.authenticate) { return }
    const user = store.user
    const authenticated = await useFetchAuth('/authenticate', {
      method: 'post',
      headers,
      query: { guarded }
    })
    if (guarded && !authenticated) {
      store.setAuthState('unauthenticated')
      throw new Error('Looks like the page you\'re looking for doesn\'t exist')
    } else if (authenticated) {
      await store.setSession(authenticated)
      if (!user) {
        await store.getUser(authenticated.userId)
        await store.getOrganization(authenticated.primaryOrganizationId)
      }
      store.setAuthState('authenticated')
    }
  } catch (e) {
    store.setAuthState('unauthenticated')
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
