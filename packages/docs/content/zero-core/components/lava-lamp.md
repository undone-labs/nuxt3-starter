# Lava Lamp


A wrapper element around an array of entries that highlights the entry currently being hovered. A background element called the marker, automatically assumes the dimensions and position of the entry it is highlighting.

## Props

| Prop | type | description | values |
| ---- | ---- | ----------- | ------ |
| `tag`<span>(optional)</span> | string | The tagname of the component root element. Must be a valid HTML element tag. Default is `div`.<ul></ul> | `div,nav,span,etc.` |
| `entries` | array | The array of entries used to generate slot children in the default slot.<ul></ul> |  |

## Slots

#### Default


**name:** `default`  **scoped:** `true`


Entry elements generated from the entries array

| binding | type | description |
| ------- | ---- | ----------- |
| `entry` | `any` | Each individual entry used to populate the slot. Typically this would be an object whose properties could be used by the child elements. |

#### Marker


**name:** `marker`  **scoped:** `false`


The visual element that acts to highlight the hovered entry.

## Methods

#### mouseenter()


The handler bound to a wrapper div around each individual entry. Called when a `mouseenter` event fires from the mouse hovering over an entry. The method calculates the dimensions and position of that entry to pass to the styles attribute of the marker while also activating the animation.

| param | type | description |
| ----- | ---- | ----------- |
| `e` | MouseEvent | The native Mouse Event passed from the `mouseenter` directive. |

#### mouseleave()


The handler bound to the lava lamp root element, fired on `mouseleave` event. This method uses a setTimeout function to hide the marker after the end animation duration has transpired.

| param | type | description |
| ----- | ---- | ----------- |
| `e` | MouseEvent | The native Mouse Event passed from the `mouseenter` directive. |
