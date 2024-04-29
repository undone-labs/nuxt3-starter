// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineStore } from 'pinia'
import { useFetchAuth } from '../composables/use-fetch-auth'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useZeroAuthStore = defineStore('zero-auth', () => {
  // ==================================================================== import
  const toasterStore = useZeroToasterStore() // eslint-disable-line
  const workspaceStore = useZeroWorkspaceStore() // eslint-disable-line
  const { workspace } = storeToRefs(workspaceStore)

  // ===================================================================== state
  const authState = ref('unauthenticated') // 'unauthenticated' → 'authenticating' → 'finalizing' → 'authenticated'
  const session = ref(null)
  const user = ref(null)
  const workspaceInviteList = ref([])
  const navPaths = ref(null)

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
   * @method setNavPaths
   * ---------------------------------------------------------------------------
   * Record the `to` and `from` navigation objects.
   * This is recorded in the nav-paths.js middleware and is used to keep track
   * of the last visited path before navigating to a new one. If redirected to
   * login page, logging in again will bring user back to this path.
   */

  const setNavPaths = payload => {
    navPaths.value = payload
  }

  /**
   * @method getUser
   * ---------------------------------------------------------------------------
   */

  const getUser = async id => {
    try {
      const response = await useFetchAuth('/get-user', {
        method: 'get',
        ...(id && {
          query: { id }
        })
      })
      setUser(response)
      return response
    } catch (e) {
      useHandleFetchError(e)
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
      const response = await useFetchAuth('/post-update-user', {
        method: 'post',
        body: Object.assign({}, payload, {
          _id: user.value._id,
          workspaceId: workspace.value._id
        })
      })
      setUser(response)
      toasterStore.addMessage({
        type: 'success',
        text: 'Setting updated'
      })
    } catch (e) {
      useHandleFetchError(e)
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
        query: {
          strategy: 'github',
          workspaceId: workspace.value._id
        }
      })
      workspaceInviteList.value = response
    } catch (e) {
      useHandleFetchError(e)
    }
  }

  /**
   * @method updateUserWorkspaceInvite
   * ---------------------------------------------------------------------------
   */

  const updateUserWorkspaceInvite = invite => {
    const index = workspaceInviteList.value.findIndex(obj => obj._id === invite._id)
    workspaceInviteList.value.splice(index, 1, invite)
  }

  /**
   * @method acceptWorkspaceInvite
   * ---------------------------------------------------------------------------
   */

  const acceptWorkspaceInvite = async (id, identifier) => {
    try {
      await useFetchAuth('/post-accept-workspace-invite', {
        method: 'post',
        body: {
          id,
          workspaceId: workspace.value._id
        }
      })
      toasterStore.addMessage({
        type: 'success',
        text: `<strong>${identifier}</strong> workspace joined`
      })
    } catch (e) {
      useHandleFetchError(e, [422])
    }
  }

  /**
   * @method rejectWorkspaceInvite
   * ---------------------------------------------------------------------------
   */

  const rejectWorkspaceInvite = async (strategy, id, identifier) => {
    try {
      await useFetchAuth('/post-reject-workspace-invite', {
        method: 'post',
        body: {
          id,
          strategy,
          workspaceId: workspace.value._id
        }
      })
      toasterStore.addMessage({
        type: 'success',
        text: `Rejected invite to <strong>${identifier}</strong> workspace`
      })
    } catch (e) {
      useHandleFetchError(e, [422])
    }
  }

  /**
   * @method leaveWorkspace
   * ---------------------------------------------------------------------------
   */

   const leaveWorkspace = async (id, identifier) => {
    try {
      await useFetchAuth('/post-leave-workspace', {
        method: 'post',
        body: {
          id,
          workspaceId: workspace.value._id
        }
      })
      toasterStore.addMessage({
        type: 'success',
        text: `Left <strong>${identifier}</strong> workspace`
      })
    } catch (e) {
      useHandleFetchError(e, [422])
    }
  }

  /**
   * @method makeWorkspacePrimary
   * ---------------------------------------------------------------------------
   */

  const makeWorkspacePrimary = async (id, identifier) => {
    try {
      user.value = await useFetchAuth('/post-make-workspace-primary', {
        method: 'post',
        body: {
          id,
          workspaceId: workspace.value._id
        }
      })
      toasterStore.addMessage({
        type: 'success',
        text: `<strong>${identifier}</strong> is now your primary workspace`
      })
    } catch (e) {
      useHandleFetchError(e, [422])
    }
  }

  // ==================================================================== return
  return {
    // ----- state
    authState,
    session,
    navPaths,
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
    setNavPaths,
    getUser,
    setUser,
    postUpdateUserSetting,
    getUserWorkspaceInviteList,
    updateUserWorkspaceInvite,
    acceptWorkspaceInvite,
    rejectWorkspaceInvite,
    leaveWorkspace,
    makeWorkspacePrimary
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useZeroAuthStore, import.meta.hot))
}
