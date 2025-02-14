
# io


Provides a globally accessible 'io' object via [defineNuxtPlugin](https://nuxt.com/docs/migration/plugins-and-middleware#migration). This object contains the `connect` method below.

## Methods


 - [connect()](#connect)

## All Members 

#### connect()


Initializes a web socket with socket.io-client's [io](https://socket.io/docs/v4/client-api) method and saves the newly created socket to the websocket store using [setWebsocketConnection](/zero-core/modules/websocket/store#setwebsocketstore).

Right after creation, listeners for `connect` and `disconnect` events are added to the socket. The `connect` listener emits a `socket.io-connected` event to the global [$bus](/zero-core/plugins#bus) upon connecting and the `disconnect` listener attempts to reinitialize the connection on a 50ms interval.


**Kind:** inner method of [io](#io)
