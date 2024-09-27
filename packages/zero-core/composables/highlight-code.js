/**
 * @module zeroHighlightCode
 * @desc A convenience wrapper for adding syntax highlighting to code strings using [highlight.js](https://highlightjs.org/). See the method below which is the default export.
 * **TODO:** This composable should also support the passing in of a custom HLJS as well as custom language imports/registration, both from outside of this composable's defaults.
 */
// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import hljsCurl from 'highlightjs-curl'

// /////////////////////////////////////////////////////////////////////// Setup
// -----------------------------------------------------------------------------
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('js', javascript)
hljs.registerLanguage('json', json)
hljs.registerLanguage('curl', hljsCurl)

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
/**
 * @method zeroHighlightCode
 * @desc Adds syntax highlight to code strings. Returns an object containing a `code` key, the value of which is the newly highlighted code, and a `language` key, providing the code language.
 * @param {string} code The code to add syntax highlighting to.
 * @param {string} language The language the code is written in. Currently, the only supported values are `javascript`, `js`, `json` && `curl` - See note above.
 * @returns {Object}
 */

export default (code, language) => {
  const languageInstalled = hljs.getLanguage(language)
  const highlighted = language && languageInstalled ?
    hljs.highlight(code, { language }) :
    hljs.highlightAuto(code)
  return { code: highlighted.value, language: highlighted.language }
}
