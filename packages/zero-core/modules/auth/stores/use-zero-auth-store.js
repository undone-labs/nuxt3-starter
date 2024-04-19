// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineStore } from 'pinia'
import { useFetchAuth } from '../composables/use-fetch-auth'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useZeroAuthStore = defineStore('zero-auth', () => {
  // ===================================================================== state
  const authState = ref('unauthenticated') // 'unauthenticated' → 'authenticating' → 'finalizing' → 'authenticated'
  const session = ref(null)
  const user = ref(null)

  // ================================================================== computed
  const loggedIn = computed(() => session.value !== null && authState.value === 'authenticated')
  const ethereum = computed(() => process.client ? window.ethereum : undefined)
  const metamaskInstalled = computed(() => ethereum.value && ethereum.value.isMetaMask)
  const userSettings = computed(() => user.value?.settings || {})

  // =================================================================== actions
  /**
   * @method setAuthState
   * ---------------------------------------------------------------------------
   */

  const setAuthState = state => {
    authState.value = state
  }

  /**
   * @method setSession
   * ---------------------------------------------------------------------------
   */

  const setSession = payload => {
    session.value = payload
  }

  /**
   * @method getUser
   * ---------------------------------------------------------------------------
   */

  const getUser = async () => {
    try {
      const response = await useFetchAuth('/get-user', {
        method: 'get'
      })
      setUser(response)
      return response
    } catch (e) {
      setUser(null)
      return null
    }
  }

  /**
   * @method setUser
   * ---------------------------------------------------------------------------
   */

  const setUser = payload => {
    user.value = payload
  }

  /**
   * @method postUpdateUserSetting
   * ---------------------------------------------------------------------------
   */

  const postUpdateUserSetting = async payload => {
    try {
      await useFetchAuth('/post-update-user', {
        method: 'post',
        body: Object.assign(payload, { _id: user.value._id })
      })
    } catch (e) {
      console.log(e)
    }
  }

  // ==================================================================== return
  return {
    // ----- state
    authState,
    session,
    user,
    // ----- computed
    loggedIn,
    ethereum,
    metamaskInstalled,
    userSettings,
    // ----- actions
    setAuthState,
    setSession,
    getUser,
    setUser,
    postUpdateUserSetting
  }
})
