// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineStore, skipHydrate } from 'pinia'
import { ref } from '#imports'
import { useFetchAuth } from '@/modules/zero/modules/auth/composables/use-fetch-auth'

// /////////////////////////////////////////////////////////////////////// State
// -----------------------------------------------------------------------------
const session = ref(null)
const account = ref(null)

// ///////////////////////////////////////////////////////////////////// Actions
// -----------------------------------------------------------------------------
// ////////////////////////////////////////////////////////////////// setSession
const setSession = (payload) => {
  session.value = payload
}

// /////////////////////////////////////////////////////////////// removeSession
const removeSession = () => {
  session.value = {}
}

// ////////////////////////////////////////////////////////////////// getAccount
const getAccount = async (userId) => {
  try {
    const response = await useFetchAuth({
      url: '/get-user',
      method: 'get',
      query: { userId }
    })
    account.value = response
  } catch (e) {
    account.value = null
  }
}

// /////////////////////////////////////////////////////////////// removeAccount
const removeAccount = () => {
  account.value = {}
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useZeroAuthStore = defineStore('zero-auth', () => ({
  // ----- state
  session: skipHydrate(session),
  account: skipHydrate(account),
  // ----- actions
  setSession,
  removeSession,
  getAccount,
  removeAccount
}))
