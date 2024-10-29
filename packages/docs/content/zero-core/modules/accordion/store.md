
# useZeroAccordionStore()


A store for tracking [accordion](/zero-core/modules/accordion/components#zero-accordion) instances and their expanded/collapsed [section](/zero-core/modules/accordion/components#zero-accordion-section) states.

## Data


 - [accordions](#accordions)

## Methods


 - [setAccordion()](#setaccordion)
 - [removeAccordion()](#removeaccordion)
 - [setAccordionSection()](#setaccordionsection)
 - [toggleAccordionSection()](#toggleaccordionsection)
 - [toggleAllSections()](#toggleallsections)

## All Members 

#### accordions


**type:** `Object`


An object containing nested objects representing individual accordion instances. Each nested object exists at the root level of this object, has a key corresponding to its accordionId and should be of the following structure:

```js

{

  accordionId: string,

  multiple: boolean,

  id: string,

  children: Array,

  active: Array|boolean,

  allSectionsOpen: boolean

}

```


**Kind:** inner ref of [useZeroAccordionStore](#usezeroaccordionstore)

#### setAccordion()


Adds an accordion instance tracking object to the [accordions object](/zero-core/modules/accordion/store#accordions) above.


**Kind:** inner method of [useZeroAccordionStore](#usezeroaccordionstore)

| param | type | description |
| ----- | ---- | ----------- |
| `payload` | Object | The tracking object. Should have the structure defined in the [accordions object](/zero-core/modules/accordion/store#accordions) above. |

#### removeAccordion()


Removes an accordion tracking object from the accordions state above.


**Kind:** inner method of [useZeroAccordionStore](#usezeroaccordionstore)

| param | type | description |
| ----- | ---- | ----------- |
| `accordionId` | string | The ID of the accordion to remove. |

#### setAccordionSection()


Adds a section to be tracked to the accordion tracking object in the accordions state above. This method pushes the section ID to the `children` array in the tracking above.


**Kind:** inner method of [useZeroAccordionStore](#usezeroaccordionstore)

| param | type | description |
| ----- | ---- | ----------- |
| `accordionId` | string | The ID of the accordion to add the section to. |
| `sectionId` | string | The ID of the section. |

#### toggleAccordionSection()


Toggles the expanded/collapsed state of an accordion section. If the toggle results in all sections of the accordion in question being set to expanded, the `allSectionsOpen` boolean in the accordion tracking object will be set to `true`. Otherwise, it is set to `false`.


**Kind:** inner method of [useZeroAccordionStore](#usezeroaccordionstore)

| param | type | description |
| ----- | ---- | ----------- |
| `accordionId` | string | The ID of the accordion that the section belongs to. |
| `sectionId` | string | The ID of the section whose expanded or collapsed state should be toggled. |

#### toggleAllSections()


Sets all sections belonging to an accordion to their expanded states.


**Kind:** inner method of [useZeroAccordionStore](#usezeroaccordionstore)

| param | type | description |
| ----- | ---- | ----------- |
| `accordionId` | string | The ID of the accordion in question. |
