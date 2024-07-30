// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { useZeroAuthStore } from '../stores/use-zero-auth-store'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
/**
 * @param {('backend'|'client'|'universal')} location - defines where to set the setting
 *   - 'backend' (default): only on the backend
 *   - 'client': only on the client
 *   - 'universal': on both the client and the backend
 */

export const useSetSettings = async (settings, location = 'backend') => {
  const authStore = useZeroAuthStore()
  const { userSettings } = storeToRefs(authStore)
  const toasterStore = useZeroToasterStore() // eslint-disable-line
  if (location === 'backend' || location === 'universal') {
    await authStore.updateUser({
      settings: Object.assign({}, userSettings.value, settings)
    })
    toasterStore.addMessage({
      type: 'success',
      text: 'Setting updated'
    })
  }
  if (location === 'client' || location === 'universal') {
    Object.assign(userSettings.value, settings)
  }
}
