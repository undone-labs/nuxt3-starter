/**
 * @todo this composable should also support the passing in of a custom HLJS as
 * well as custom language imports/registration, both from outside of this
 * composable's defaults
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
 */

export default (code, language) => {
  const languageInstalled = hljs.getLanguage(language)
  const highlighted = language && languageInstalled ?
    hljs.highlight(code, { language }) :
    hljs.highlightAuto(code)
  return { code: highlighted.value, language: highlighted.language }
}
