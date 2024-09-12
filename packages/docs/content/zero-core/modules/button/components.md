
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

| name | scoped | bindings |
| ---- | ------ | -------- |
| default | `true` | `loading` |

### Emitters


 - clicked - undefined

## Methods

##### clickHandler()


a 'clicked' event. If the button has an ID, the id will be used to set the loading state in the button store using [setButton](/zero-core/modules/button/store.html#setbutton)

##### handleSessionExpired()
