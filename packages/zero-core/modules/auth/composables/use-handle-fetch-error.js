// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import Chalk from 'chalk'

import { useZeroAuthStore } from '../stores/use-zero-auth-store'
import { useZeroToasterStore } from '@/../zero-core/modules/toaster/stores/use-zero-toaster-store'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useHandleFetchError = (e, showToast = []) => {
  const { $bus } = useNuxtApp()
  const serverEnv = useRuntimeConfig().public.serverEnv
  const toasterStore = useZeroToasterStore()
  const authStore = useZeroAuthStore()
  /**
   * Log errors in non-production systems
   */
  if (serverEnv !== 'production') {
    console.log('\n')
    if (e.status && e.statusMessage) {
      console.log(`${Chalk.bold.red(e.status)}`, '→', e.statusMessage)
    } else {
      console.log(Chalk.bold.red('error'))
    }
    console.log(e.stack)
    console.log('\n')
  }
  /**
   * Unauthenticated, usually because session has expired
   */
  if (e.status === 401) {
    authStore.setAuthState('unauthenticated')
    $bus.$emit('session-expired')
  }
  /**
   * Unauthorized, user does not have the required permissions
   */
  else if (e.status === 403) {
    if (showToast.includes(403)) {
      toasterStore.addMessage({
        type: 'error',
        text: e.statusMessage
      })
    }
  }
  /**
   * Examples:
   *   - Incorrect input
   *   - Input does not match a db entry
   *   - db entry already exists
   */
  else if (e.status === 422) {
    if (showToast.includes(422)) {
      toasterStore.addMessage({
        type: 'error',
        text: e.statusMessage
      })
    }
  }
  /**
   * All other error codes, display a toast
   */
  else {
    toasterStore.addMessage({
      type: 'error',
      text: 'Something went wrong, please try again'
    })
  }
}
