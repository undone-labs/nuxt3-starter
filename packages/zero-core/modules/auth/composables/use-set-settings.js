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

export const useSetSettings = (settings, location = 'backend') => {
  const store = useZeroAuthStore()
  const { userSettings } = storeToRefs(store)
  if (location === 'backend' || location === 'universal') {
    store.postUpdateUserSetting({
      settings: Object.assign({}, userSettings.value, settings)
    })
  }
  if (location === 'client' || location === 'universal') {
    Object.assign(userSettings.value, settings)
  }
}
