/**
 * @link https://stackoverflow.com/a/75395371
 */

// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineNuxtPlugin } from '#imports'
import io from 'socket.io-client'

// /////////////////////////////////////////////////////////////////// Functions
// -----------------------------------------------------------------------------
/**
 * @method connect
 */

const connect = next => {
  let interval
  let socket = io(useRuntimeConfig().public.websocketUrl)
  socket.on('disconnect', reason => {
    if (reason === 'ping timeout' || reason === 'transport close' || reason === 'transport error') {
      interval = setInterval(() => {
        socket = io(useRuntimeConfig().public.websocketUrl)
        clearInterval(interval)
      }, 50)
    }
  })
  socket.on('connect', () => {
    clearInterval(interval)
    next(socket)
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
