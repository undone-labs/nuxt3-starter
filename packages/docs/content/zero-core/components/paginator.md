# Paginator


A pagination component that automatically divides up an array of elements into paginated results or pages. It offers a control interface to navigate between pages of results.

## Props

| Prop | type | description | values |
| ---- | ---- | ----------- | ------ |
| `buffer`<span>(optional)</span> | number | The number of pages on either side of the current page to display as options to navigate to in the controls.<ul></ul> |  |
| `limit` | number | The number of elements shown per page.<ul></ul> |  |
| `offset` | number | The index of the first pagination element that appears on the current page. The [current page](/zero-core/components/paginator#currentpage) will be computed automatically based on this index.<ul></ul> |  |
| `total` | number | The total number of elements to paginate.<ul></ul> |  |

## Computed properties

#### currentPage()


The current page number. Computed using the offset prop divided by the results per page (limit prop).


 - **returns:** `number`  

#### totalPages()


The total number of pages in the paginated list.


 - **returns:** `number`  

#### pages()


An array of objects containing data about every single page in the paginated list. Each object has three properties: <ul><li>`display`; A boolean indicating if the control for this page should be displayed</li><li>`value`; The page number</li><li>`current`; A boolean indicating if this page is currently selected</li></ul>.


 - **returns:** `[Object]`  

## Slots

#### Before


**name:** `before`  **scoped:** `false`


Elements passed to this slot will appear before the controls.

#### First


**name:** `first`  **scoped:** `true`


The left-most control element which will navigate to the first page.

| binding | type | description |
| ------- | ---- | ----------- |
| `increment-page` | `func` | Passes the [incrementPage](/zero-core/components/paginator#incrementpage) method. The first argument of which should be set to 'first'. |

#### Prev


**name:** `prev`  **scoped:** `true`


The 2nd from the left control element which will navigate to the previous page.

| binding | type | description |
| ------- | ---- | ----------- |
| `increment-page` | `func` | Passes the [incrementPage](/zero-core/components/paginator#incrementpage) method. The first argument of which should be set to 'prev'. |

#### Breaker Left


**name:** `breaker-left`  **scoped:** `false`


A breaker element to insert between left controls and page numbers.

#### Page


**name:** `page`  **scoped:** `true`


An array of elements, each of which will navigate to a specific page determined by their page binding. Elements are generated from the pages computed property.

| binding | type | description |
| ------- | ---- | ----------- |
| `page` | `object` | An object containing data about the page that this element will navigate to when clicked. |
| `increment-page` | `func` | Passes the [incrementPage](/zero-core/components/paginator#incrementpage) method. The first argument should be omitted and the page number from the page object binding above should be passed as the second argument instead. |

#### Breaker Right


**name:** `breaker-right`  **scoped:** `false`


A breaker element to insert between page numbers and right controls.

#### Next


**name:** `next`  **scoped:** `true`


The 2nd from the right control element which will navigate to the next page.

| binding | type | description |
| ------- | ---- | ----------- |
| `increment-page` | `func` | Passes the [incrementPage](/zero-core/components/paginator#incrementpage) method. The first argument of which should be set to 'next'. |

#### Last


**name:** `last`  **scoped:** `true`


The right-most control element which will navigate to the last page.

| binding | type | description |
| ------- | ---- | ----------- |
| `increment-page` | `func` | Passes the [incrementPage](/zero-core/components/paginator#incrementpage) method. The first argument of which should be set to 'last'. |

#### After


**name:** `after`  **scoped:** `false`


Elements passed to this slot will appear after the controls.

## Emitters


 - **pageIncremented** - returns: `{ page: number, offset: number }` - Emits an object containing the page number to display in the UI (`page` property) and the index (`offset` property) of the first pagination element on the selected page. This index is used internally by this component to compute the [current page](/zero-core/components/paginator#currentpage).

## Methods

#### incrementPage()


Initiates a change in page and emits the new page value with the [pageIncremented](/zero-core/components/paginator#emitters) emitter.

| param | type | description |
| ----- | ---- | ----------- |
| `action` | string\|null | If provided, must be one of `first`, `prev`, `next` or `last`, otherwise, the second argument, `page` will take precedent. |
| `page` | number\|undefined | If provided and a valid action is not, the current page will be updated to this value. |
