// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { useRuntimeConfig } from '#imports'
import { useZeroAuthStore } from '@/modules/zero/modules/auth/stores/use-zero-auth-store'
import { useZeroButtonStore } from '@/modules/zero/modules/button/stores/use-zero-button-store'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useLogout = async () => {
  const { public: { auth: authConfig } } = useRuntimeConfig()
  const redirectAfterLogout = authConfig.redirectAfterLogout === '' ? null : authConfig.redirectAfterLogout
  const authStore = useZeroAuthStore()
  const buttonStore = useZeroButtonStore()
  await $fetch('/api/logout')
  authStore.setSession(null)
  authStore.setAccount(null)
  buttonStore.setButton({ id: 'zero-authentication-logout', loading: false })
  if (redirectAfterLogout) {
    console.log(redirectAfterLogout)
    navigateTo(redirectAfterLogout)
  }
}
