// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { useZeroAuthStore } from '../stores/use-zero-auth-store'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useSetSession = async incoming => {
  const config = useRuntimeConfig()
  const session = incoming.session
  const loader = incoming.id
  const authConfig = config.public.auth
  let redirect = authConfig.redirectAfterLogin === '' ? {} : authConfig.redirectAfterLogin || {}
  const authStore = useZeroAuthStore()
  const orgStore = useZeroOrgStore()
  authStore.setSession(session)
  authStore.setAuthState('finalizing')
  const user = await authStore.getUser()
  await orgStore.getOrganization(user.primaryOrganizationId)
  await orgStore.getOrganizationList()
  if (typeof redirect === 'object' && redirect.hasOwnProperty('path') && redirect.hasOwnProperty('match')) {
    const match = redirect.match
    redirect = redirect.path
    Object.keys(match).forEach(key => {
      redirect = redirect.replace(key, user.github[match[key]])
    })
  }
  if (redirect) {
    await navigateTo(redirect)
  }
  authStore.setAuthState('authenticated')
  // app.$toaster.add(data.toast)
}
