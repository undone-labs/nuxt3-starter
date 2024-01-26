// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import zeroUuid from '../../../composables/uuid'
import { defineStore } from 'pinia'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useZeroToasterStore = defineStore('zero-toaster', () => {
  // ===================================================================== state
  const toasts = ref([])

  // =================================================================== actions

  /**
   * @method addMessage
   */

  const addMessage = payload => {
    // const config = useRuntimeConfig().public.toaster
    // const len = toasts.value.length
    // const display = config.display
    // payload.
    // console.log('✅', payload.id)
    toasts.value.unshift(Object.assign(payload, {
      id: zeroUuid().v4(),
      animate: 'in'
    }))
    // toasts.value.push(payload)
    // if (len >= display) {
    //   hideMessage(toasts.value[len - display].id)
    // }
    // console.log(toasts.value)
    // return payload.id
  }

  /**
   * @method hideMessage
   */

  const hideMessage = id => {
    const index = toasts.value.findIndex(obj => obj && obj.id === id)
    const toast = Object.assign({}, toasts.value[index], { animate: 'out' })
    toasts.value.splice(index, 1, toast)
  }

  /**
   * @method replaceMessage
   *
   * @note the below action will be wired up when needed in the future
   */

  // const replaceMessage = payload => {
  //   const id = payload.id
  //   const toast = payload.toast
  //   const index = toasts.value.findIndex(obj => obj && obj.id === id)
  //   if (index !== -1) {
  //     toasts.value.splice(payload.index, 1, payload.toast)
  //   }
  //   return id
  // }

  // ==================================================================== return
  return {
    // ----- state
    toasts,
    // ----- actions
    addMessage,
    hideMessage
    // replaceMessage
  }
})
