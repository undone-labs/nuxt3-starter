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
  const organization = ref(null)
  const user = ref(null)

  // ================================================================== computed
  const loggedIn = computed(() => session.value !== null && authState.value === 'authenticated')
  const ethereum = computed(() => process.client ? window.ethereum : undefined)
  const metamaskInstalled = computed(() => ethereum.value && ethereum.value.isMetaMask)

  // =================================================================== actions
  /**
   * @method setAuthState
   */

  const setAuthState = state => {
    authState.value = state
  }

  /**
   * @method setSession
   */

  const setSession = payload => {
    session.value = payload
  }

  /**
   * @method getOrganization
   */

  const getOrganization = async organizationId => {
    try {
      const response = await useFetchAuth('/get-organization', {
        method: 'get',
        query: { organizationId }
      })
      setOrganization(response)
      return response
    } catch (e) {
      setOrganization(null)
      return null
    }
  }

  /**
   * @method setOrganization
   */

  const setOrganization = payload => {
    organization.value = payload
  }

  /**
   * @method getUser
   */

  const getUser = async userId => {
    try {
      const response = await useFetchAuth('/get-user', {
        method: 'get',
        query: { userId }
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
   */

  const setUser = payload => {
    user.value = payload
  }

  // ==================================================================== return
  return {
    // ----- state
    authState,
    session,
    organization,
    user,
    // ----- computed
    loggedIn,
    ethereum,
    metamaskInstalled,
    // ----- actions
    setAuthState,
    setSession,
    getOrganization,
    setOrganization,
    getUser,
    setUser
  }
})
