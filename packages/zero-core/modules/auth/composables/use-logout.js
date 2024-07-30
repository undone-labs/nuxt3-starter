// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { useZeroAuthStore } from '../stores/use-zero-auth-store'
import { useZeroButtonStore } from '../../button/stores/use-zero-button-store'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useLogout = async () => {
  const { $bus } = useNuxtApp()
  const { public: { auth: authConfig } } = useRuntimeConfig()
  const redirectAfterLogout = authConfig.redirectAfterLogout === '' ? null : authConfig.redirectAfterLogout
  const authStore = useZeroAuthStore()
  const buttonStore = useZeroButtonStore()
  await authStore.setAuthState('unauthenticated')
  await useFetchAuth('/logout', { method: 'post' })
  if (redirectAfterLogout) {
    await navigateTo(redirectAfterLogout)
  }
  buttonStore.setButton({ id: 'auth-logout', loading: false })
  /**
   * The following emit should be caught by the client in order to do something
   * like displaying a toast
   */
  $bus.$emit('session-unset')
}
