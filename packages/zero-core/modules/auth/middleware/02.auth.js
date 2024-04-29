// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { useZeroAuthStore } from '../stores/use-zero-auth-store'
import { useZeroWorkspaceStore } from '../stores/use-zero-workspace-store'
import { useAuthorized } from '../composables/use-authorized'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $pinia, $bus } = useNuxtApp()
  const { public: { auth: authConfig } } = useRuntimeConfig()
  const authStore = useZeroAuthStore($pinia)
  const { user, navPaths } = storeToRefs(authStore)
  const workspaceStore = useZeroWorkspaceStore($pinia)
  const { workspaceList } = storeToRefs(workspaceStore)
  const meta = to.meta
  try {
    /**
     * Do not authenticate if page explicitly sets `authenticate: false`
     * in `definePageMeta()`
     */
    if (meta.hasOwnProperty('authenticate') && !meta.authenticate) { return }
    /**
     * Authenticate the user (via session cookies)
     */
    const authenticated = await useFetchAuth('/authenticate', {
      method: 'post',
      query: { guarded: meta.guarded }
    })
    /**
     * Authentication success
     */
    if (authenticated) {
      await authStore.setSession(authenticated)
      if (!user.value) {
        await authStore.getUser(authenticated.userId)
        await workspaceStore.getWorkspaceList()
        const targetWorkspace = workspaceList.value.find(obj => obj.slug === to.params.workspace)
        if (to.params.workspace && !targetWorkspace) {
          return showError({
            statusCode: 404,
            message: 'Page Not Found'
          })
        }
        await workspaceStore.getWorkspace(targetWorkspace ? targetWorkspace._id : user.value.primaryWorkspace._id)
      }
      authStore.setAuthState('authenticated')
    }
    /**
     * Check authorization status and redirect to /404 if authorization fails
     */
    if (meta.hasOwnProperty('authorize')) {
      if (!meta.authorize.hasOwnProperty('permission') || !meta.authorize.hasOwnProperty('method')) { return }
      if (!useAuthorized(meta.authorize.permission, meta.authorize.method)) {
        return navigateTo('/404')
      }
    }
  } catch (e) {
    authStore.setAuthState('unauthenticated')
    const navigationType = navPaths.value.navigationType
    /**
     * If landing on a page via SSR, redirect to 404
     */
    if (e.status && navigationType === 'server') {
      return navigateTo('/404')
    } else {
      console.log(e)
    }
    /**
     * If navigating to a page client-side send a global emit, usually used to
     * open a login modal/alert
     */
    if (navigationType === 'client') {
      $bus.$emit('session-expired')
      return abortNavigation()
    }
  }
})
