/**
 * @module useZeroWebsocketStore
 * @desc A store for a client-side websocket to be used across an app.
 */
// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useZeroWebsocketStore = defineStore('zero-websocket', () => {
  // ===================================================================== state
  /**
   * @member
   * @kind ref
   * @desc A websocket object.
   */
  const socket = ref(null)

  // =================================================================== actions

  /**
   * @method setWebsocketConnection
   * @desc Sets the [socket](/zero-core/modules/websocket/store#socket) to the incoming payload.
   * @param {Object} payload An initialized [websocket instance](https://socket.io/docs/v4/client-socket-instance/).
   */

  const setWebsocketConnection = payload => {
    socket.value = payload
  }

  /**
   * @method joinRoom
   * @desc Used to join a specific room in a websocket connection
   * @param {String} roomId A room ID
   */

  const joinRoom = roomId => {
    socket.value.emit('join-room', roomId)
  }

  /**
   * @method leaveRoom
   * @desc Used to leave a specific room in a websocket connection, as well as to remove a list of listeners. Listeners should be removed before unmounting components in order to prevent the listener from being added more than once.
   * @param {String} roomId A room ID
   * @param {Array} listenersToRemove A list of listeners names as strings
   */

  const leaveRoom = (roomId, listenersToRemove = []) => {
    socket.value.emit('leave-room', roomId)
    listenersToRemove.forEach(listener => socket.value.removeAllListeners(listener))
  }

  // ==================================================================== return
  return {
    // ----- state
    socket,
    // ----- actions
    setWebsocketConnection,
    joinRoom,
    leaveRoom
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useZeroWebsocketStore, import.meta.hot))
}
