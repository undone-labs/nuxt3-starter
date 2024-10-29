/**
 * @module io
 * @desc Provides a globally accessible 'io' object via [defineNuxtPlugin](https://nuxt.com/docs/migration/plugins-and-middleware#migration). This object contains the `connect` method below.
 */
// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineNuxtPlugin } from '#imports'
import io from 'socket.io-client'

// /////////////////////////////////////////////////////////////////// Functions
// -----------------------------------------------------------------------------
/**
 * @method connect
 * @desc Initializes a web socket with socket.io-client's [io](https://socket.io/docs/v4/client-api) method and saves the newly created socket to the websocket store using [setWebsocketConnection](/zero-core/modules/websocket/store#setwebsocketstore).
 * Right after creation, listeners for `connect` and `disconnect` events are added to the socket. The `connect` listener emits a `socket.io-connected` event to the global [$bus](/zero-core/plugins#bus) upon connecting and the `disconnect` listener attempts to reinitialize the connection on a 50ms interval.
 */

const connect = () => {
  const websocketStore = useZeroWebsocketStore()
  const { socket } = storeToRefs(websocketStore)
  const { $bus } = useNuxtApp()
  return new Promise(resolve => {
    let interval
    websocketStore.setWebsocketConnection(io(useRuntimeConfig().public.websocketUrl, {
      withCredentials: true
    }))
    socket.value.on('disconnect', reason => {
      if (reason === 'ping timeout' || reason === 'transport close' || reason === 'transport error') {
        interval = setInterval(() => {
          socket.value = io(useRuntimeConfig().public.websocketUrl, {
            withCredentials: true
          })
          clearInterval(interval)
        }, 50)
      }
    })
    socket.value.on('connect', () => {
      clearInterval(interval)
      $bus.$emit('socket.io-connected', socket.value)
      resolve(socket.value)
    })
  })
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineNuxtPlugin(() => {
  return {
    provide: {
      io: {
        connect
      }
    }
  }
})
