// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { useZeroAuthStore } from '../stores/use-zero-auth-store'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useSetSettings = settings => {
  const store = useZeroAuthStore()
  store.postUpdateUserSetting({
    settings: Object.assign({}, store.userSettings, settings)
  })
}
