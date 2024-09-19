# Dropdown


A dropdown menu component that exposes two slots. [See below](/zero-core/components/dropdown#slots) for a description of each. When the dropdown menu is open clicking anywhere outside the dropdown causes it to close. This functionality is provided by VueUse's [onClickOutside](https://vueuse.org/core/onClickOutside/).

## Props

| Prop | type | description | values |
| ---- | ---- | ----------- | ------ |
| `toggleOn`<span>(optional)</span> | string | The type of event that should initiate dropdown toggle. | `click,hover` |
| `displaySelected`<span>(optional)</span> | boolean | Determines if the current value of the dropdown should be displayed in the toggle button slot. |  |
| `defaultOption`<span>(optional)</span> | string\|object | The initial option to load as 'selected'. This should match one of the options passed to the setSelected and isSelected bindings on the dropdown-panel slot from the parent component's option list. |  |

## Slots

##### Toggle Button


**name:** `toggle-button`  **scoped:** `true`


Accepts an element that will toggle the menu visibility and display the selected value (if `displaySelected` prop is enabled).

| binding | type | description |
| ------- | ---- | ----------- |
| `toggle-panel` | `func` | Passes the [togglePanel](/zero-core/components/dropdown#togglepanel) method to the slot. |
| `panel-open` | `boolean` | The current state of the dropdown panel; true for open, false for closed. |
| `close-panel` | `func` | Passes the [closePanel](/zero-core/components/dropdown#closepanel) method to the slot. |
| `selected` | `union` | Passes the current selected option to the slot. |

##### Dropdown Panel


**name:** `dropdown-panel`  **scoped:** `true`


Accepts a list of elements generated from the dropdown options.

| binding | type | description |
| ------- | ---- | ----------- |
| `close-panel` | `func` | Passes the [closePanel](/zero-core/components/dropdown#closepanel) method to the slot. |
| `set-selected` | `func` | Passes the [setSelected](/zero-core/components/dropdown#setselected) method to the slot. |
| `is-selected` | `func` | Passes the [isSelected](/zero-core/components/dropdown#isselected) method to the slot. |

## Emitters


 - **dropdownPanelToggled** - returns: `boolean` - When the dropdown panel is toggled, emits the new state of the panel; true for open, false for closed.
 - **optionSelected** - returns: `string|Object` - Emits the selected option value.

## Methods

##### togglePanel()

##### closePanel()

##### setSelected()

##### isSelected()
