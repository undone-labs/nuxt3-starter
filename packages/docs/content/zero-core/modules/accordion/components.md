
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




## Props

| Prop | type | description | values |
| ---- | ---- | ----------- | ------ |
| `accordionId` | string |  |  |
| `multiple`<span>(optional)</span> | boolean |  |  |
| `toggleOnLoad`<span>(optional)</span> | boolean |  |  |

## Slots

#### Default


**name:** `default`  **scoped:** `false`

## Methods

#### handleKeyboardNavigation()
