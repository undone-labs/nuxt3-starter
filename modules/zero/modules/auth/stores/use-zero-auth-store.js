// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineStore } from 'pinia'
import { ref } from '#imports'
import { useFetchAuth } from '@/modules/zero/modules/auth/composables/use-fetch-auth'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useZeroAuthStore = defineStore('zero-auth', () => {
  // ===================================================================== state
  const session = ref(null)
  const account = ref(null)

  // =================================================================== actions
  /**
   * @method setSession
   */

  const setSession = (payload) => {
    session.value = payload
  }

  /**
   * @method setSession
   */

  const removeSession = () => {
    session.value = {}
  }

  /**
   * @method setSession
   */

  const getAccount = async (userId) => {
    try {
      const response = await useFetchAuth({
        url: '/get-user',
        method: 'get',
        query: { userId }
      })
      account.value = response
      return response
    } catch (e) {
      account.value = null
      return null
    }
  }

  /**
   * @method setSession
   */

  const removeAccount = () => {
    account.value = {}
  }

  // ==================================================================== return
  return {
    // ----- state
    session,
    account,
    // ----- actions
    setSession,
    removeSession,
    getAccount,
    removeAccount
  }
})
