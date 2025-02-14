
# Zero Accordion Section


A single accordion section comprised of a header and content that expands and collapses when the header is clicked.

## Props

| Prop | type | description | values |
| ---- | ---- | ----------- | ------ |
| `accordionId` | string | The ID of this section's parent accordion. |  |

## Computed properties

#### accordion()


Returns the parent accordion of this section from the [accordions](/zero-core/modules/accordion/store#accordions) array in the accordion store.


 - **returns:** `Object`  

#### active()


Returns an array of active sections in this [accordion](/zero-core/modules/accordion/components#zero-accordion). Each section is referenced by a Unique ID set from `instance.uid` where instance is given by the `getCurrentInstance()` composable.


 - **returns:** `[number]`  

#### open()


Returns the open/expanded state of this section as a boolean; true for open, false for closed.


 - **returns:** `boolean`  

## Slots

#### Header


**name:** `header`  **scoped:** `false`


Header content for each section. This content is wrapped in a clickable div when will toggle the section's expanded state.

#### Content


**name:** `content`  **scoped:** `false`


Collapsible content for each section. The content slot requires a single root HTML element to animate correctly.

## Methods

#### toggle()


Toggles the expanded state of this section using the accordion store's [toggleAccordionSection](/zero-core/modules/accordion/store#toggleaccordionsection) method.

#### setHeight()


Calculates and sets the height of the accordion section content. Called every time the [open](/zero-core/modules/accordion/components#open) state changes using a watcher.

# Zero Accordion Toggle Button


An instance of the [zeroButton](/zero-core/modules/button/components) that expands and collapses all accordion sections of its associated accordion at once.

## Props

| Prop | type | description | values |
| ---- | ---- | ----------- | ------ |
| `accordionId` | string | The ID of the target accordion for this component. |  |

## Computed properties

#### accordion()


Returns the accordion associated with this component from the [accordions](/zero-core/modules/accordion/store#accordions) array in the accordion store.


 - **returns:** `Object`  

#### allSectionsOpen()


A boolean indicating if all the sections belonging to this component's accordion are open or not. True if all are open, false if otherwise.


 - **returns:** `boolean`  

## Slots

#### Default


**name:** `default`  **scoped:** `true`


Button content

| binding | type | description |
| ------- | ---- | ----------- |
| `all-sections-open` | `mixed` | Binds the [allSectionsOpen](/zero-core/modules/accordion/components#allsectionsopen) computed prop to the slot. |

## Methods

#### toggleAllAccordionSections()


Called when the button is clicked. This method subsequently calls the [toggleAllSections](/zero-core/modules/accordion/store#toggleallsections) method from the accordion store. Sets the [zeroButton](/zero-core/modules/button/components) component instance to loading: `false`.

# Zero Accordion


A component with child sections that can be toggled to expand and collapse. This component is relatively simple, consisting of a slot for multiple [zeroAccordionSection](/zero-core/modules/accordion/components#zero-accordion-section) components.

In the `onBeforeMount` hook of this component, an instance tracking object is set in the accordion store using the store's [setAccordion](/zero-core/modules/accordion/store#setaccordion) method. When the component is mounted, if the `toggleOnLoad` and `multiple` props are set to true, the [toggleAllSections](/zero-core/modules/accordion/store#toggleallsections) method of the accordion store will be called for this accordion instance.

## Props

| Prop | type | description | values |
| ---- | ---- | ----------- | ------ |
| `accordionId` | string | A unique identifier for this accordion instance. This same prop is present in all children components and its value should match those of its children. |  |
| `multiple`<span>(optional)</span> | boolean | A boolean indicating whether or not multiple accordion sections can be expanded at the same time. `true` if so, `false` indicates expanded section states are mutually exclusive. |  |
| `toggleOnLoad`<span>(optional)</span> | boolean | A boolean indicating whether or not all accordion sections should be expanded upon mounting the component. **If `multiple` is set to false, this setting has no effect.** |  |

## Slots

#### Default


**name:** `default`  **scoped:** `false`


[zeroAccordionSections](/zero-core/modules/accordion/components#zero-accordion-section) should be added to this slot

## Methods

#### handleKeyboardNavigation()


The keyboard event handler that is called on window `keydown` events. Used to navigate the accordion with the keyboard. It will call the accordion store's [toggleAllSections](/zero-core/modules/accordion/store#toggleallsections) method if the 'f' and meta keys are pressed.

| param | type | description |
| ----- | ---- | ----------- |
| `e` | Object | The [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) object. |
