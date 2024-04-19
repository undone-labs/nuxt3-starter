// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineStore } from 'pinia'
import { useFetchAuth } from '../composables/use-fetch-auth'
import CloneDeep from 'lodash.cloneDeep'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useZeroOrgStore = defineStore('zero-org', () => {
  // ==================================================================== import
  const authStore = useZeroAuthStore() // eslint-disable-line
  const { user } = storeToRefs(authStore)

  // ===================================================================== state
  const organization = ref(null)
  const organizationList = ref([])

  // =================================================================== actions
  /**
   * @method getOrganization
   * ---------------------------------------------------------------------------
   */

   const getOrganization = async id => {
    try {
      const response = await useFetchAuth('/get-organization', {
        method: 'get',
        query: { id }
      })
      setOrganization(response)
      organization.value = response
    } catch (e) {
      console.log(e)
      return 'error'
    }
  }

  /**
   * @method setOrganization
   * ---------------------------------------------------------------------------
   */

  const setOrganization = payload => {
    organization.value = payload
  }

  /**
   * @method getOrganizationList
   * ---------------------------------------------------------------------------
   */

   const getOrganizationList = async () => {
    try {
      const response = await useFetchAuth('/get-organization-list', {
        method: 'get'
      })
      setOrganizationList(response)
      return response
    } catch (e) {
      setOrganizationList([])
      return null
    }
  }

  /**
   * @method setOrganizationList
   * ---------------------------------------------------------------------------
   */

  const setOrganizationList = payload => {
    organizationList.value = organizationList.value.concat(payload)
  }

  /**
   * @method checkOrganizationExists
   * ---------------------------------------------------------------------------
   */

   const checkOrganizationExists = async slug => {
    try {
      return await useFetchAuth('/get-check-organization-exists', {
        method: 'get',
        query: { slug }
      })
    } catch (e) {
      console.log(e)
      return 'error'
    }
  }

  /**
   * @method createOrganization
   * ---------------------------------------------------------------------------
   */

  const createOrganization = async payload => {
    try {
      const response = await useFetchAuth('/post-create-organization', {
        method: 'post',
        body: payload
      })
      setOrganizationList([response.organization]) // add new org list
      authStore.setUser(response.user) // update user
      return response
    } catch (e) {
      console.log(e)
      return null
    }
  }

  // ==================================================================== return
  return {
    // ----- state
    organization,
    organizationList,
    // ----- actions
    getOrganization,
    setOrganization,
    getOrganizationList,
    setOrganizationList,
    checkOrganizationExists,
    createOrganization
  }
})
