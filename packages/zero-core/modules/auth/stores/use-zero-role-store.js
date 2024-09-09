// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineStore } from 'pinia'
import { useFetchAuth } from '../composables/use-fetch-auth'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useZeroRoleStore = defineStore('zero-role', () => {
  // ==================================================================== import
  const workspaceStore = useZeroWorkspaceStore() // eslint-disable-line
  const { workspace } = storeToRefs(workspaceStore)
  const toasterStore = useZeroToasterStore() // eslint-disable-line
  const buttonStore = useZeroButtonStore() // eslint-disable-line

  // =================================================================== actions

  /**
   * @method updateMemberRole
   */

  const updateMemberRole = async payload => {
    try {
      const switchToRoleName = await useFetchAuth('/post-update-workspace-member-role', {
        method: 'post',
        body: Object.assign(payload, {
          workspaceId: workspace.value._id
        })
      })
      toasterStore.addMessage({
        type: 'success',
        text: `Role changed to <strong>${switchToRoleName}</strong>`
      })
    } catch (e) {
      useHandleFetchError(e)
    }
  }

  /**
   * @method updateRolePermission
   */

  const updateRolePermission = async payload => {
    try {
      const response = await useFetchAuth('/post-update-role-permission', {
        method: 'post',
        body: Object.assign(payload, {
          workspaceId: workspace.value._id
        })
      })
      toasterStore.addMessage({
        type: 'success',
        text: `Permission changed to <strong>${response}</strong>`
      })
    } catch (e) {
      useHandleFetchError(e, [422])
    }
  }

  /**
   * @method updateRole
   */

  const updateRole = async payload => {
    const roleId = payload.roleId
    try {
      const updatedName = await useFetchAuth('/post-update-role', {
        method: 'post',
        body: Object.assign(payload, {
          workspaceId: workspace.value._id
        })
      })
      toasterStore.addMessage({
        type: 'success',
        text: `Role info updated for <strong>${updatedName}</strong>`
      })
    } catch (e) {
      useHandleFetchError(e, [422])
    }
    buttonStore.setButton({ id: `button-role-save-${roleId}`, loading: false })
  }

  /**
   * @method createRole
   */

  const createRole = async payload => {
    const buttonId = 'button-create-role'
    try {
      const newRole = await useFetchAuth('/post-create-role', {
        method: 'post',
        body: Object.assign(payload, {
          workspaceId: workspace.value._id
        })
      })
      toasterStore.addMessage({
        type: 'success',
        text: `<strong>${newRole}</strong> role created`
      })
      buttonStore.setButton({ id: buttonId, loading: false })
      return true
    } catch (e) {
      useHandleFetchError(e, [422])
      buttonStore.setButton({ id: buttonId, loading: false })
      return false
    }
  }

  /**
   * @method deleteRole
   */

  const deleteRole = async roleId => {
    try {
      const role = workspace.value.roles.find(item => item._id === roleId)
      const userCount = role.users.length
      if (userCount) {
        toasterStore.addMessage({
          type: 'error',
          text: `This role is still assigned to ${userCount} user${userCount === 1 ? '' : 's'}. Re-assign them before deleting this role.`
        })
        buttonStore.setButton({ id: `button-role-delete-${roleId}`, loading: false })
        return false
      } else {
        await useFetchAuth('/post-delete-role', {
          method: 'post',
          body: {
            roleId,
            workspaceId: workspace.value._id
          }
        })
        toasterStore.addMessage({
          type: 'success',
          text: `Role <strong>${role.name}</strong> deleted`
        })
        buttonStore.setButton({ id: `button-role-delete-${roleId}`, loading: false })
        return true
      }
    } catch (e) {
      useHandleFetchError(e, [422])
      buttonStore.setButton({ id: `button-role-delete-${roleId}`, loading: false })
      return false
    }
  }

  // ==================================================================== return
  return {
    // ----- actions
    updateMemberRole,
    updateRolePermission,
    updateRole,
    createRole,
    deleteRole
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useZeroRoleStore, import.meta.hot))
}
