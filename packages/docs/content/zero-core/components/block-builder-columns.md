# Block Builder Columns


Generates the columns that make up a [Block Builder](/zero-core/components/block-builder) page section. Each column renders a list of child blocks. This component can call itself recursively, in which case the parent instance turns into the grid containing child columns.

## Props

| Prop | type | description | values |
| ---- | ---- | ----------- | ------ |
| `columns` | array | An array of columns to render within a parent section's grid. Each column object consists of the following optional properties:<ul><li>`col` - **type:** `string` - See [Gridlex docs](https://gridlex.devlint.fr/) for how to format this value. If this value includes `grid`, the component will be triggered to recursively call itself.</li><li>`data-push-left` - **type:** `string` - See [Gridlex docs](https://gridlex.devlint.fr/) for how to format and how this will affect the column.</li><li>`data-push-right` - **type:** `string` - See [Gridlex docs](https://gridlex.devlint.fr/) for how to format and how this will affect the column.</li><li>`columns` - **type:** `[Object]` - When recursively calling itself, this array of column objects will be passed to the child [Block Builder Columns](/zero-core/components/block-builder-columns) component.</li><li>`classes` - **type:** `[string]` - An array of classes to add to the column's inner content wrapper.</li><li>`blocks` - **type:** `[Object]` - An array of block objects. The properties of each block object are bound to Vue's dynamic component, `<component />`. Each block object must include an `is` property that tells the dynamic component what component to render. The `is` key is deleted from the object before props are bound to the component instance.</li></ul> |  |

## Methods

#### parseColumns()


Parses and formats the columns array to be used by the component render template.

| param | type | description |
| ----- | ---- | ----------- |
| `columns` | [Object] | An array of column objects. |


 - **returns:** `[Object]`  

#### getColumnPushAttributes()


Searches a column for the presence of one or both `data-push-left` and/or `data-push-right` attributes and returns an object with just these two attributes to bind to the column element.

| param | type | description |
| ----- | ---- | ----------- |
| `column` | Object | The column object to parse. |


 - **returns:** `Object`  

#### getColumnClasses()


Joins the classes in the column's classes array into a single string to add to the class list of the inner `.column-content` div.

| param | type | description |
| ----- | ---- | ----------- |
| `column` | Object | The column object to parse. |


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
