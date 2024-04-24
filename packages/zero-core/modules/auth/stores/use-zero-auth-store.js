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
  const workspaceInviteList = ref([])

  // ================================================================== computed
  const loggedIn = computed(() => session.value !== null && authState.value === 'authenticated')
  const ethereum = computed(() => process.client ? window.ethereum : undefined)
  const metamaskInstalled = computed(() => ethereum.value && ethereum.value.isMetaMask)
  const userSettings = computed(() => user.value?.settings || {})
  const workspaceInvitesPending = computed(() => {
    const list = workspaceInviteList.value
    if (list.length === 0) { return false }
    return list.some(obj => obj.status === 'pending')
  })

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
   * @method getCurrentlyLoggedInUser
   * ---------------------------------------------------------------------------
   */

  const getCurrentlyLoggedInUser = async () => {
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

  /**
   * @method getUserWorkspaceInviteList
   * ---------------------------------------------------------------------------
   */

  const getUserWorkspaceInviteList = async () => {
    try {
      const response = await useFetchAuth('/get-user-workspace-invite-list', {
        method: 'get',
        query: { strategy: 'github' }
      })
      workspaceInviteList.value = response
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * @method updateUserWorkspaceInvite
   * ---------------------------------------------------------------------------
   */

  const updateUserWorkspaceInvite = async invite => {
    const index = workspaceInviteList.value.findIndex(obj => obj._id === invite._id)
    workspaceInviteList.value.splice(index, 1, invite)
  }

  /**
   * @method acceptWorkspaceInvite
   * ---------------------------------------------------------------------------
   */

  const acceptWorkspaceInvite = async id => {
    try {
      await useFetchAuth('/post-accept-workspace-invite', {
        method: 'post',
        body: { id }
      })
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * @method rejectWorkspaceInvite
   * ---------------------------------------------------------------------------
   */

  const rejectWorkspaceInvite = async (strategy, id) => {
    try {
      await useFetchAuth('/post-reject-workspace-invite', {
        method: 'post',
        body: { id, strategy }
      })
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * @method leaveWorkspace
   * ---------------------------------------------------------------------------
   */

   const leaveWorkspace = async id => {
    try {
      await useFetchAuth('/post-leave-workspace', {
        method: 'post',
        body: { id }
      })
    } catch (e) {
      console.log(e)
      if (e.status === 422) {
        // @TODO wire up toaster
      }
    }
  }

  // ==================================================================== return
  return {
    // ----- state
    authState,
    session,
    user,
    workspaceInviteList,
    // ----- computed
    loggedIn,
    ethereum,
    metamaskInstalled,
    userSettings,
    workspaceInvitesPending,
    // ----- actions
    setAuthState,
    setSession,
    getCurrentlyLoggedInUser,
    setUser,
    postUpdateUserSetting,
    getUserWorkspaceInviteList,
    updateUserWorkspaceInvite,
    acceptWorkspaceInvite,
    rejectWorkspaceInvite,
    leaveWorkspace
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useZeroAuthStore, import.meta.hot))
}
