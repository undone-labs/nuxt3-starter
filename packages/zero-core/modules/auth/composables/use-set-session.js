// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { useZeroAuthStore } from '../stores/use-zero-auth-store'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useSetSession = async session => {
  const { $bus } = useNuxtApp()
  const config = useRuntimeConfig()
  const authConfig = config.public.auth
  const authStore = useZeroAuthStore()
  const workspaceStore = useZeroWorkspaceStore()
  authStore.setSession(session)
  authStore.setAuthState('finalizing')
  const user = await authStore.getUser(session.userId)
  await workspaceStore.getWorkspace(user.primaryWorkspace._id)
  await workspaceStore.getWorkspaceList()
  authStore.setAuthState('authenticated')
  /**
   * The following emit should be caught by the client in order to redirect to
   * the correct page after login
   */
  $bus.$emit('session-set')
}
