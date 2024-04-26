// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { useZeroToasterStore } from '@/../zero-core/modules/toaster/stores/use-zero-toaster-store'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useHandleFetchError = e => {
  const serverEnv = useRuntimeConfig().public.serverEnv
  const toasterStore = useZeroToasterStore()
  /**
   * Log errors in non-production systems
   */
  if (serverEnv !== 'production') {
    console.log(e)
  }
  /**
   * Examples:
   *   - Incorrect input
   *   - Input does not match a db entry
   *   - db entry already exists
   */
  if (e.status === 422) {
    toasterStore.addMessage({
      type: 'error',
      text: e.statusMessage
    })
  }
}
