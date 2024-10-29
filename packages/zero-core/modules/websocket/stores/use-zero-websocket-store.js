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

  // ==================================================================== return
  return {
    // ----- state
    socket,
    // ----- actions
    setWebsocketConnection
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useZeroWebsocketStore, import.meta.hot))
}
