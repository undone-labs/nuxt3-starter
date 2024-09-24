
# useZeroStore()


A general store for the Zero Core module.

## Data


 - [clipboard](#clipboard)
 - [seo](#seo)

## Methods


 - [setClipboard()](#setclipboard)
 - [setSeo()](#setseo)

## All Members 

#### clipboard


**type:** `string|boolean`


Holds text to copy. Set to `false` if no text is present.


**Kind:** inner ref of [useZeroStore](#usezerostore)

#### seo


**type:** `Object`


An object whose keys denote areas of an app or site to apply a unique SEO data object to meta head tags. For example, a site index page could use an `index` key and the corresponding value would be an object of key-value pairs. In this object, keys represent meta tags and values represent the string values to populate them with.

There should always be a `_` key present in the seo object that refrences an object containing general, fallback or default SEO data.


**Kind:** inner ref of [useZeroStore](#usezerostore)

#### setClipboard()


Sets the clipboard text. Set to false when no text should be present in the [clipboard](/zero-core/use-zero-store#clipboard).


**Kind:** inner method of [useZeroStore](#usezerostore)

| param | type | description |
| ----- | ---- | ----------- |
| `text` | string\|boolean | The text to copy. |

#### setSeo()


Sets the [seo](/zero-core/use-zero-store#seo) object.


**Kind:** inner method of [useZeroStore](#usezerostore)

| param | type | description |
| ----- | ---- | ----------- |
| `content` | Object | An SEO data object. |
