// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineStore } from 'pinia'
import { useFetchAuth } from '@/modules/zero/modules/auth/composables/use-fetch-auth'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useZeroAuthStore = defineStore('zero-auth', () => {
  // ===================================================================== state
  const session = ref(null)
  const account = ref(null)

  // ================================================================== computed
  const isLoggedIn = computed(() => session.value !== null)

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

  const getAccount = async (userId) => {
    try {
      const response = await useFetchAuth({
        url: '/get-user',
        method: 'get',
        query: { userId }
      })
      setAccount(response)
      return response
    } catch (e) {
      setAccount(null)
      return null
    }
  }

  /**
   * @method setAccount
   */

  const setAccount = (payload) => {
    account.value = payload
  }

  // ==================================================================== return
  return {
    // ----- state
    session,
    account,
    // ----- computed
    isLoggedIn,
    // ----- actions
    setSession,
    getAccount,
    setAccount
  }
})
