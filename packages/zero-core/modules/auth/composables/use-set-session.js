// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { useZeroAuthStore } from '../stores/use-zero-auth-store'
import { useZeroButtonStore } from '../../button/stores/use-zero-button-store'
import { useZeroToasterStore } from '../../toaster/stores/use-zero-toaster-store'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useSetSession = async (incoming) => {
  const config = useRuntimeConfig()
  const session = incoming.session
  const loader = incoming.loader
  const authConfig = config.public.auth
  let redirect = authConfig.redirectAfterLogin === '' ? {} : authConfig.redirectAfterLogin || {}
  const authStore = useZeroAuthStore()
  const buttonStore = useZeroButtonStore()
  const toasterStore = useZeroToasterStore()
  authStore.setSession(session)
  buttonStore.setButton({ id: loader, loading: false })
  const user = await authStore.getUser(session.userId)
  if (typeof redirect === 'object' && redirect.hasOwnProperty('path') && redirect.hasOwnProperty('match')) {
    const match = redirect.match
    redirect = redirect.path
    Object.keys(match).forEach(key => {
      redirect = redirect.replace(key, user.github[match[key]])
    })
  }
  toasterStore.addMessage({
    type: 'toast',
    message: 'You are now logged in'
  })
  if (redirect) {
    navigateTo(redirect)
  }
}
