// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useZeroWebsocketStore = defineStore('zero-websocket', () => {
  // ===================================================================== state
  const socket = ref(null)

  // =================================================================== actions

  /**
   * @method setWebsocketConnection
   * ---------------------------------------------------------------------------
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
