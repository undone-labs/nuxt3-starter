// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineStore } from 'pinia'
import { useFetchAuth } from '../composables/use-fetch-auth'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useZeroWorkspaceStore = defineStore('zero-workspace', () => {
  // ==================================================================== import
  const authStore = useZeroAuthStore() // eslint-disable-line
  const { user } = storeToRefs(authStore)
  const toasterStore = useZeroToasterStore() // eslint-disable-line

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
    } catch (e) {
      useHandleFetchError(e)
    }
  }

  /**
   * @method updateWorkspace
   * ---------------------------------------------------------------------------
   */

   const updateWorkspace = async (payload, displayToast = true) => {
    try {
      const response = await useFetchAuth('/post-update-workspace', {
        method: 'post',
        body: Object.assign({}, {
          _id: workspace.value._id,
          workspaceId: workspace.value._id
        }, payload)
      })
      setWorkspace(response)
      if (displayToast) {
        toasterStore.addMessage({
          type: 'success',
          text: 'Workspace updated'
        })
      }
    } catch (e) {
      useHandleFetchError(e, [422, 403])
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
      useHandleFetchError(e)
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
        query: {
          slug,
          workspaceId: workspace.value._id
        }
      })
    } catch (e) {
      useHandleFetchError(e, [422, 403])
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
        body: Object.assign(payload, {
          workspaceId: workspace.value._id
        })
      })
      workspaceList.value.push(response.workspace)
      authStore.setUser(response.user) // update user
    } catch (e) {
      useHandleFetchError(e, [422, 403])
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
      useHandleFetchError(e)
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
      toasterStore.addMessage({
        type: 'success',
        text: `Workspace invite sent to <strong>${identifier}</strong>`
      })
    } catch (e) {
      useHandleFetchError(e, [422, 403])
    }
  }

  /**
   * @method updateWorkspaceInvite
   * ---------------------------------------------------------------------------
   */

  const updateWorkspaceInvite = invite => {
    const index = workspaceInviteList.value.findIndex(obj => obj._id === invite._id)
    workspaceInviteList.value.splice(index, 1, invite)
  }

  /**
   * @method revokeWorkspaceInvite
   * ---------------------------------------------------------------------------
   */

  const revokeWorkspaceInvite = async (strategy, identifier, id) => {
    try {
      await useFetchAuth('/post-revoke-workspace-invite', {
        method: 'post',
        body: {
          id,
          strategy,
          workspaceId: workspace.value._id
        }
      })
      toasterStore.addMessage({
        type: 'success',
        text: `Workspace invite for <strong>${identifier}</strong> has been revoked`
      })
    } catch (e) {
      useHandleFetchError(e, [422, 403])
    }
  }

  /**
   * @method removeMemberFromWorkspace
   * ---------------------------------------------------------------------------
   */

  const removeMemberFromWorkspace = async (id, identifier) => {
    try {
      await useFetchAuth('/post-remove-member-from-workspace', {
        method: 'post',
        body: {
          userId: id,
          workspaceId: workspace.value._id
        }
      })
      toasterStore.addMessage({
        type: 'success',
        text: `<strong>${identifier}</strong> has been removed from <strong>${workspace.value.name}</strong> workspace`
      })
    } catch (e) {
      useHandleFetchError(e, [422, 403])
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
    updateWorkspace,
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
