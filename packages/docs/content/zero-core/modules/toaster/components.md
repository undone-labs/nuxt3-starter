
# Zero Toast


A 'toast' component; a small window with a message for the user that pops up like toast out of a toaster. As soon as the component is mounted, the [unToast]() method is called which will automatically clear the toast after a set time interval.

Additionally, a watcher is set to watch the toast prop's `jingle` key. The jingle property is an integer value which represents the number of 'repeats' of the same message. If this value is greater than zero, the watcher will call the unToast method below and set a timeout to update the toast message jingle property to `0`. This functionality effectively extends the life of an existing toast message if that message is repeatedly added rather than creating multiple popup windows with the same message.

## Props

| Prop | type | description | values |
| ---- | ---- | ----------- | ------ |
| `toast` | object | The toast object for this component instance that is held in the [toaster store](/zero-core/modules/toaster/store). |  |

## Slots

#### Toast


**name:** `toast`  **scoped:** `true`


The content of the toast window.

| binding | type | description |
| ------- | ---- | ----------- |
| `toast` | `mixed` | Binds the 'toast' prop object to the slot. |

## Methods

#### unToast()


Sets a timer with a setTimeout function. Once the timer interval has elapsed, removes the toast message from view using the toaster store's [removeMessage](/zero-core/modules/toaster/store#removemessage) method. The time interval can be set in the nuxt.config.js file under `zero.modules.toaster.timeout` or it is derived from the toast prop's `.timeout` key.

# Zero Toaster


The Zero Toaster is a component that displays important info/messages to the user in small alert windows called 'toasts'. The name is a reference the way that alert messages pop up like toast out of a toaster. This component, the 'toaster', renders the individual [toast](/zero-core/modules/toaster/components#zero-toast) components that display a message to the user and allows for multiple messages to be displayed at once.

Uses a Vue [transition-group](https://vuejs.org/guide/built-ins/transition-group) to animate toast component entry and exit.

## Props

| Prop | type | description | values |
| ---- | ---- | ----------- | ------ |
| `from`<span>(optional)</span> | string | Defines the direction which 'toast' windows should enter from relative to the viewport. Overrides the module setting set in the `nuxt.config.js` under `zero.modules.toaster`. | `top,bottom` |

## Slots

#### Toast


**name:** `toast`  **scoped:** `true`


The content of the toast window.

| binding | type | description |
| ------- | ---- | ----------- |
| `toast` | `mixed` | Binds the toast object that is bound to the child toast component slot. This will be the same object passed as the 'toast' prop to the [toast component](/zero-core/modules/toaster/components#zero-toast). |
