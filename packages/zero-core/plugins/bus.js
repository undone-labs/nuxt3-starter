// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineNuxtPlugin } from '#app'
import mitt from 'mitt'
const emitter = mitt()

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
/**
 * @method Bus
 * @desc Test
 */
export default defineNuxtPlugin(() => {
  return {
    provide: {
      bus: {
        $on: emitter.on,
        $off: emitter.off,
        $emit: emitter.emit
      }
    }
  }
})
