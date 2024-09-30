/**
 * @module Bus
 * @desc A Nuxt plugin that uses [mitt](https://github.com/developit/mitt) to handle socket events. To use the bus import it from the [useNuxtApp](https://nuxt.com/docs/api/composables/use-nuxt-app) composable like so;
 * ```js
 * const << $bus >> = useNuxtApp()
 * ```
 * The `$bus` object offers three methods; `$on`, `$off` and `$emit` corresponding to `emitter.on`, `emitter.off` and `emitter.emit` events from mitt. See the [mitt documentation](https://github.com/developit/mitt) for more info.
 */
// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineNuxtPlugin } from '#app'
import mitt from 'mitt'
const emitter = mitt()

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
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
