
# useZeroButtonStore()


A store for tracking [button](/zero-core/modules/button/components) component loading states.

## Data


 - [buttons](#buttons)

## Methods


 - [setButton()](#setbutton)
 - [removeButton()](#removebutton)

## All Members 

#### buttons


**type:** `Object`


An object containing nested objects representing individual button instances. Each nested object exists at the root level of this object, has a key corresponding to its button ID and should be of the following structure:

```js

{

  id: string,

  loading: boolean

}

```


**Kind:** inner ref of [useZeroButtonStore](#usezerobuttonstore)

#### setButton()


Sets a tracking object in the [buttons object](/zero-core/modules/button/store#buttons) to the incoming payload. The key used to reference this tracking object is the button ID.


**Kind:** inner method of [useZeroButtonStore](#usezerobuttonstore)

| param | type | description |
| ----- | ---- | ----------- |
| `payload` | Object | The tracking object to add. |
| `payload.id` | string | The ID of the button to track. |
| `payload.loading` | boolean | A boolean indicating whether or not this button is loading. |

#### removeButton()


Removes a tracking object from the [buttons object](/zero-core/modules/button/store#buttons).


**Kind:** inner method of [useZeroButtonStore](#usezerobuttonstore)

| param | type | description |
| ----- | ---- | ----------- |
| `id` | string | The ID of the button to remove. |
