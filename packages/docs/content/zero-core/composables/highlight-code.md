# zeroHighlightCode


A convenience wrapper for adding syntax highlighting to code strings using [highlight.js](https://highlightjs.org/). See the method below which is the default export.

**TODO:** This composable should also support the passing in of a custom HLJS as well as custom language imports/registration, both from outside of this composable's defaults.

## Methods


 - [zeroHighlightCode()](#zerohighlightcode)

## All Members 

#### zeroHighlightCode()


Adds syntax highlight to code strings. Returns an object containing a `code` key, the value of which is the newly highlighted code, and a `language` key, providing the code language.


**Kind:** inner method of [zeroHighlightCode](#zerohighlightcode)

| param | type | description |
| ----- | ---- | ----------- |
| `code` | string | The code to add syntax highlighting to. |
| `language` | string | The language the code is written in. Currently, the only supported values are `javascript`, `js`, `json` && `curl` - See note above. |


 - **Returns:** `Object`
