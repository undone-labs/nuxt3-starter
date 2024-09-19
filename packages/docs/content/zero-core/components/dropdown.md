# Dropdown




## Props

| Prop | type | description | values |
| ---- | ---- | ----------- | ------ |
| `toggleOn`<span>(optional)</span> | string |  |  |
| `displaySelected`<span>(optional)</span> | boolean |  |  |
| `defaultOption`<span>(optional)</span> | string\|object |  |  |

## Slots

| name | scoped | bindings |
| ---- | ------ | -------- |
| toggle-button | `true` | `toggle-panel` `panel-open` `close-panel` `selected` |
| dropdown-panel | `true` | `close-panel` `set-selected` `is-selected` |

### Emitters


 - dropdownPanelToggled - undefined
 - optionSelected - undefined

## Methods

##### togglePanel()

##### closePanel()

##### setSelected()

##### isSelected()
