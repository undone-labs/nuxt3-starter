
# useZeroToasterStore()


A store for toast message data tracking. Allows 'toaster' messages to be conveniently added from anywhere within an app.

## Data


 - [toasts](#toasts)

## Methods


 - [addMessage()](#addmessage)
 - [removeMessage()](#removemessage)
 - [updateToast()](#updatetoast)

## All Members 

#### toasts


**type:** `Array`


An array of toast message objects containing message data and data about how the message should be displayed by the [toast and toaster components](/zero-core/modules/toaster/components). Each message object has the following structure:

```js

{

  text: string, // toast message

  id: string, // automatically generated using the zeroUuid composable

  jingle: number, // automatically added, see the toast component for more info

  timeout: number, // how long the message should display in milliseconds

  from: string // the direction the toast should appear from, 'top' or 'bottom'

}

```


**Kind:** inner ref of [useZeroToasterStore](#usezerotoasterstore)

#### addMessage()


Add a message to be displayed with a [toast component](/zero-core/modules/toaster/components#zero-toast).


**Kind:** inner method of [useZeroToasterStore](#usezerotoasterstore)

| param | type | description |
| ----- | ---- | ----------- |
| `payload` | Object | An object containing the message to display. The object should at least have the following text property but can additionally have any of the properties outlines above in [toasts](/zero-core/modules/toaster/store#toasts). |
| `payload.text` | string | The message to display. |

#### removeMessage()


Removes a toast message object from the [toasts](/zero-core/modules/toaster/store#toasts) array.


**Kind:** inner method of [useZeroToasterStore](#usezerotoasterstore)

| param | type | description |
| ----- | ---- | ----------- |
| `id` | string | The ID of the toast to remove. |

#### updateToast()


Updates a toast message object from the [toasts](/zero-core/modules/toaster/store#toasts) array.


**Kind:** inner method of [useZeroToasterStore](#usezerotoasterstore)

| param | type | description |
| ----- | ---- | ----------- |
| `id` | string | The ID of the toast to update. |
| `payload` | Object | An object with properties and values to assign to the toast object in question. See [toasts](/zero-core/modules/toaster/store#toasts) for possible key-value pairs. |
