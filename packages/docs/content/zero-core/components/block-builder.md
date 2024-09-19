# Block Builder


A high level page-builder component that generates a series of page sections containing columns and blocks from a JSON content scaffold. Generates child columns for each section using the [Block Builder Columns](/zero-core/components/block-builder-columns) component.

## Props

| Prop | type | description | values |
| ---- | ---- | ----------- | ------ |
| `sections` | array | An array of page sections. Each section object can have the following properties:<ul><li>`id` - **type:** `string` - The DOM element id of the section</li><li>`grid` - **type:** `[string]` - An array of strings to append to the section grid class (see [Gridlex docs](https://gridlex.devlint.fr/) for possible options).</li><li>`columns` - **type:** `[Object]` - An array of column objects passed as the `columns` prop to [Block Builder Columns](/zero-core/components/block-builder-columns).</li><li>`blocks` - **type:** `[Object]` - An array of block objects. The properties of each block object are bound to Vue's dynamic component, `<component />`. Each block object must include an `is` property that tells the dynamic component what component to render. The `is` key is deleted from the object before props are bound to the component instance. These components will render outside of a column and thus will be free from the grid positioning.</li><li>`hide` - **type:** `boolean` - If set to true will remove this section from the list of sections to render.</li></ul> |  |

## Methods

#### notHidden()


Filters hidden sections from the list of sections to render.

| param | type | description |
| ----- | ---- | ----------- |
| `sections` | [Object] | The array of sections passed to the Block Builder as a prop. |


 - **returns:** `[Object]`  

#### getGridClasses()


Append gridlex classes to the grid. Returns a single string used by the Gridlex grid. See props above for more info.

| param | type | description |
| ----- | ---- | ----------- |
| `grid` | [string] | The array of classes to append. |


 - **returns:** `string`  

#### getBlocks()


Tests if there are blocks to render outside the grid columns.

| param | type | description |
| ----- | ---- | ----------- |
| `section` | [Object] | The section to test for the existence of a blocks array. |


 - **returns:** `[Object]|boolean`  

#### stripIs()


Removes the `is` property from the props objects which will be bound to dynamically rendered block components.

| param | type | description |
| ----- | ---- | ----------- |
| `block` | Object | The block object who's key-value pairs will be bound to the component instance as props. |


 - **returns:** `Object`  
