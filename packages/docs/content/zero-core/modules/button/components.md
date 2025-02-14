
# Zero Button


A feature-rich button component. It can be used as an internal or external link, as a regular button or as a button with loading states.

If an ID is provided via the `id` prop, the button will be registered in the [zeroButtonStore](/zero-core/modules/button/store) with a tracking object that makes loading states available.

## Props

| Prop | type | description | values |
| ---- | ---- | ----------- | ------ |
| `tag`<span>(optional)</span> | string | Defines the type of component this button will use. Use `nuxt-link` to create an internal link, `a` for an external link and `button` for a regular button element. Alternatively, any valid html element tag can be provided. | `nuxt-link,a,button,etc.` |
| `to`<span>(optional)</span> | string\|object | If the button is intended to be used as either an internal or external link, this is the URL which it should navigate to. |  |
| `target`<span>(optional)</span> | string\|object | The target attribute to add to the native anchor tag element. Mostly used for opening external links in new tabs with the target set to `_blank`. |  |
| `id`<span>(optional)</span> | string\|object | A unique ID for this button. Only required if using the button with loading state functionality. |  |
| `forceDisabled`<span>(optional)</span> | boolean | A boolean indicating if this button should be forced to be disabled. Otherwise the disabled state is automatically set to true when the button is loading; see the [loading](/zero-core/modules/button/components#loading) computed prop below. |  |
| `forceLoading`<span>(optional)</span> | boolean | A boolean offering the ability to force a button's loading state. Will override the automatic loading state handling. |  |
| `selected`<span>(optional)</span> | boolean | A boolean indicating if this button is set to a 'selected' state. This only toggles a `selected` class in the button's classlist which can be styled from components above using `:deep(.button)`. |  |

## Computed properties

#### button()


Returns this button's tracking object from the [button store](/zero-core/modules/button/store#buttons).


 - **returns:** `Object`  

#### loading()


Returns the loading state from the button tracking object above. Is overriden by the boolean value of the `forceLoading` prop.


 - **returns:** `boolean`  

#### disabled()


Returns a boolean indicating if this button is disabled or not. Returns `true` if the button loading value is true as per above or if the `forceDisabled` prop is set to true.


 - **returns:** `boolean`  

#### component()


The component name to be passed to the `:is` prop of the Nuxt [dynamic component](https://nuxt.com/docs/guide/directory-structure/components#dynamic-components) instance. If the button is disabled, the `button` tag is returned.


 - **returns:** `string`  

## Slots

#### Default


**name:** `default`  **scoped:** `true`


The button content.

| binding | type | description |
| ------- | ---- | ----------- |
| `loading` | `mixed` | Binds the loading state returned by the [loading](/zero-core/modules/button/components#loading) computed prop. |

## Emitters


 - **clicked** - Emits the click event received by the [clickHandler](/zero-core/modules/button/components#clickhandler) on click.

## Methods

#### clickHandler()


Emits a 'clicked' event. If the button has an ID, the id will be used to set the loading state in the button store using [setButton](/zero-core/modules/button/store#setbutton).

| param | type | description |
| ----- | ---- | ----------- |
| `e` | Object | A [click](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event) event. |

#### handleSessionExpired()


If this button is loading, sets its loading state to `false` with [setButton](/zero-core/modules/button/store#setbutton). Before the button component is mounted, this method is registered with the Zero Core [$bus](/zero-core/plugins#bus) plugin listening for a `session-expired` event. It can be used for example, to set button loading states to false if a websocket disconnects.
