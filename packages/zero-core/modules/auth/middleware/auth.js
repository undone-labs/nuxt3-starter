// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { useZeroAuthStore } from '../stores/use-zero-auth-store'
import { useZeroWorkspaceStore } from '../stores/use-zero-workspace-store'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp()
  const { public: { auth: authConfig } } = useRuntimeConfig()
  const redirectUnauthenticated = authConfig.redirectUnauthenticated === '' ? null : authConfig.redirectUnauthenticated
  const authStore = useZeroAuthStore(nuxtApp.$pinia)
  const workspaceStore = useZeroWorkspaceStore(nuxtApp.$pinia)
  try {
    const meta = to.meta
    const guarded = meta.guarded
    if (meta.hasOwnProperty('authenticate') && !meta.authenticate) { return }
    let user = authStore.user
    const authenticated = await useFetchAuth('/authenticate', {
      method: 'post',
      query: { guarded }
    })
    if (guarded && !authenticated) {
      authStore.setAuthState('unauthenticated')
      throw new Error('Looks like the page you\'re looking for doesn\'t exist')
    } else if (authenticated) {
      await authStore.setSession(authenticated)
      if (!user) {
        user = await authStore.getCurrentlyLoggedInUser()
        await workspaceStore.getWorkspace(user.primaryWorkspaceId)
        await workspaceStore.getWorkspaceList()
      }
      authStore.setAuthState('authenticated')
    }
  } catch (e) {
    authStore.setAuthState('unauthenticated')
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
