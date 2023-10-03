// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineStore } from 'pinia'
import { ref } from '#imports'

// /////////////////////////////////////////////////////////////////////// State
// -----------------------------------------------------------------------------
const modalActive = ref(false)
const activeResult = ref(false)

// ///////////////////////////////////////////////////////////////////// Actions
// -----------------------------------------------------------------------------
// ///////////////////////////////////////////////////////////////// toggleModal
const toggleModal = (state) => {
  document.body.classList[state ? 'add' : 'remove']('no-scroll')
  modalActive.value = state
}

// ///////////////////////////////////////////////////////////// setActiveResult
const setActiveResult = (hitObjectID) => {
  activeResult.value = hitObjectID
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useZeroAlgoliaStore = defineStore('zero-algolia', () => ({
  // ----- state
  modalActive,
  activeResult,
  // ----- actions
  toggleModal,
  setActiveResult
}))
