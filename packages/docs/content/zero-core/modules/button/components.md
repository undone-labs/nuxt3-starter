
# Zero Button




## Props

| Prop | type | description | values |
| ---- | ---- | ----------- | ------ |
| `tag`<span>(optional)</span> | string |  |  |
| `to`<span>(optional)</span> | string\|object |  |  |
| `target`<span>(optional)</span> | string\|object |  |  |
| `id`<span>(optional)</span> | string\|object |  |  |
| `forceDisabled`<span>(optional)</span> | boolean |  |  |
| `forceLoading`<span>(optional)</span> | boolean |  |  |
| `selected`<span>(optional)</span> | boolean |  |  |

## Slots

#### Default


**name:** `default`  **scoped:** `true`

| binding | type | description |
| ------- | ---- | ----------- |
| `loading` |  |  |

## Emitters


 - **clicked** - undefined

## Methods

#### clickHandler()


Emits a 'clicked' event. If the button has an ID, the id will be used

to set the loading state in the button store using [setButton](/zero-core/modules/button/store.html#setbutton)

#### handleSessionExpired()
