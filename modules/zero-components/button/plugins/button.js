// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import CloneDeep from 'lodash.cloneDeep'
import { defineNuxtPlugin } from '#imports'
import { useZeroButtonStore } from '../stores/button.js'

// ////////////////////////////////////////////////////////////// [Class] Button
// -----------------------------------------------------------------------------
const Button = (id, store) => {
  let button = store.buttons[id]
  return {
    // ================================================================ register
    async register () {
      if (button) { return this.get() }
      return await this.set({ id, loading: false })
    },

    // ============================================================== deregister
    async deregister () {
      await store.removeButton(id)
    },

    // ===================================================================== get
    get () {
      return Object.assign(this, button)
    },

    // ===================================================================== set
    async set (incoming) {
      button = await store.setButton(Object.assign(CloneDeep(button || {}), incoming))
      return this.get()
    }
  }
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineNuxtPlugin(() => {
  const store = useZeroButtonStore()
  return {
    provide: {
      button: (id) => Button(id, store)
    }
  }
})
