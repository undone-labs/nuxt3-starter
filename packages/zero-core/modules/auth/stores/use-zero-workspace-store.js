// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineStore } from 'pinia'
import { useFetchAuth } from '../composables/use-fetch-auth'
import CloneDeep from 'lodash.cloneDeep'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useZeroWorkspaceStore = defineStore('zero-workspace', () => {
  // ==================================================================== import
  const authStore = useZeroAuthStore() // eslint-disable-line
  const { user } = storeToRefs(authStore)

  // ===================================================================== state
  const workspace = ref(null)
  const workspaceList = ref([])
  const workspaceInviteList = ref([])

  // =================================================================== actions
  /**
   * @method getWorkspace
   * ---------------------------------------------------------------------------
   */

   const getWorkspace = async id => {
    try {
      const response = await useFetchAuth('/get-workspace', {
        method: 'get',
        query: { id }
      })
      setWorkspace(response)
      workspace.value = response
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * @method setWorkspace
   * ---------------------------------------------------------------------------
   */

  const setWorkspace = payload => {
    workspace.value = payload
  }

  /**
   * @method getWorkspaceList
   * ---------------------------------------------------------------------------
   */

   const getWorkspaceList = async () => {
    try {
      const response = await useFetchAuth('/get-workspace-list', {
        method: 'get'
      })
      workspaceList.value = response
      return response
    } catch (e) {
      workspaceList.value = []
      return null
    }
  }

  /**
   * @method checkWorkspaceExists
   * ---------------------------------------------------------------------------
   */

   const checkWorkspaceExists = async slug => {
    try {
      return await useFetchAuth('/get-check-workspace-exists', {
        method: 'get',
        query: { slug }
      })
    } catch (e) {
      console.log(e)
      return false
    }
  }

  /**
   * @method createWorkspace
   * ---------------------------------------------------------------------------
   */

  const createWorkspace = async payload => {
    try {
      const response = await useFetchAuth('/post-create-workspace', {
        method: 'post',
        body: payload
      })
      workspaceList.value.push(response.workspace)
      authStore.setUser(response.user) // update user
      return response
    } catch (e) {
      console.log(e)
      return null
    }
  }

  /**
   * @method getWorkspaceInviteList
   * ---------------------------------------------------------------------------
   */

  const getWorkspaceInviteList = async () => {
    try {
      const response = await useFetchAuth('/get-workspace-invite-list', {
        method: 'get',
        query: {
          workspaceId: workspace.value._id
        }
      })
      workspaceInviteList.value = response
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * @method createWorkspaceInvite
   * ---------------------------------------------------------------------------
   */

  const createWorkspaceInvite = async (strategy, identifier, incoming) => {
    try {
      await useFetchAuth('/post-create-workspace-invite', {
        method: 'post',
        body: {
          workspaceId: workspace.value._id,
          strategy,
          identifier,
          data: incoming
        }
      })
    } catch (e) {
      if (e.status === 422) {
        console.log(e.message) // display a toast
      }
    }
  }

  /**
   * @method updateWorkspaceInvite
   * ---------------------------------------------------------------------------
   */

  const updateWorkspaceInvite = async invite => {
    const index = workspaceInviteList.value.findIndex(obj => obj._id === invite._id)
    workspaceInviteList.value.splice(index, 1, invite)
  }

  /**
   * @method revokeWorkspaceInvite
   * ---------------------------------------------------------------------------
   */

  const revokeWorkspaceInvite = async (strategy, id) => {
    try {
      await useFetchAuth('/post-revoke-workspace-invite', {
        method: 'post',
        body: { id, strategy }
      })
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * @method removeMemberFromWorkspace
   * ---------------------------------------------------------------------------
   */

  const removeMemberFromWorkspace = async id => {
    try {
      await useFetchAuth('/post-remove-member-from-workspace', {
        method: 'post',
        body: {
          userId: id,
          workspaceId: workspace.value._id
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  // ==================================================================== return
  return {
    // ----- state
    workspace,
    workspaceList,
    workspaceInviteList,
    // ----- actions
    getWorkspace,
    setWorkspace,
    getWorkspaceList,
    checkWorkspaceExists,
    createWorkspace,
    getWorkspaceInviteList,
    createWorkspaceInvite,
    updateWorkspaceInvite,
    revokeWorkspaceInvite,
    removeMemberFromWorkspace
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useZeroWorkspaceStore, import.meta.hot))
}
