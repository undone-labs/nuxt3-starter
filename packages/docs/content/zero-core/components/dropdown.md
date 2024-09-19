# Dropdown


A dropdown menu component that exposes two slots; a dropdown button and a panel of options. [See below](/zero-core/components/dropdown#slots) for a description of each. When the dropdown menu is open, clicking anywhere outside the dropdown causes it to close. This functionality is provided by VueUse's [onClickOutside](https://vueuse.org/core/onClickOutside/).

The options panel (dropdown menu) is wrapped in a `.panel-container` container element. The top offset of this element ('padding-top' or 'top') and panel width and/or max-height must be set in the parent component as these are custom properties that will differ panel-to-panel.

## Props

| Prop | type | description | values |
| ---- | ---- | ----------- | ------ |
| `toggleOn`<span>(optional)</span> | string | The type of event that should initiate dropdown toggle.<ul></ul> | `click,hover` |
| `displaySelected`<span>(optional)</span> | boolean | Determines if the current value of the dropdown should be displayed in the toggle button slot.<ul></ul> |  |
| `defaultOption`<span>(optional)</span> | string\|object | The initial option to load as 'selected'. This should match one of the options passed to the setSelected and isSelected bindings on the dropdown-panel slot from the parent component's option list.<ul></ul> |  |

## Slots

#### Toggle Button


**name:** `toggle-button`  **scoped:** `true`


Accepts an element that will toggle the menu visibility and display the selected value (if `displaySelected` prop is enabled).

| binding | type | description |
| ------- | ---- | ----------- |
| `toggle-panel` | `func` | Passes the [togglePanel](/zero-core/components/dropdown#togglepanel) method to the slot. |
| `panel-open` | `boolean` | The current state of the dropdown panel; true for open, false for closed. |
| `close-panel` | `func` | Passes the [closePanel](/zero-core/components/dropdown#closepanel) method to the slot. |
| `selected` | `union` | Passes the current selected option to the slot. |

#### Dropdown Panel


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

#### togglePanel()


Toggles the dropdown panel open state if the `toggleOn` prop is set to 'click'

#### closePanel()


Sets the dropdown panel state to closed if the `toggleOn` prop is set to click and the panel is already open.

#### setSelected()


Sets the selected value of the dropdown menu, only if the `displaySelected` prop is set to `true`. Also closes the open dropdown panel.

| param | type | description |
| ----- | ---- | ----------- |
| `value` | string\|Object | The option value to set as selected. |

#### isSelected()


Tests if the argument value is currently the selected value. Returns the test result.

| param | type | description |
| ----- | ---- | ----------- |
| `value` | string\|Object | The option value to test. |


 - **returns:** `boolean`  
