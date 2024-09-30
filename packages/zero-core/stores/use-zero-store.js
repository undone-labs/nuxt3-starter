/**
 * @module useZeroStore
 * @desc A general store for the Zero Core module.
 */
// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { ref } from '#imports'
import { defineStore } from 'pinia'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useZeroStore = defineStore('zero', () => {
  // ===================================================================== state
  /**
   * @member {string|boolean} clipboard
   * @kind ref
   * @desc Holds text to copy. Set to `false` if no text is present.
   */
  const clipboard = ref(false)

  /**
   * @member {Object} seo
   * @kind ref
   * @desc An object whose keys denote areas of an app or site to apply a unique SEO data object to meta head tags. For example, a site index page could use an `index` key and the corresponding value would be an object of key-value pairs. In this object, keys represent meta tags and values represent the string values to populate them with.
   * There should always be a `_` key present in the seo object that refrences an object containing general, fallback or default SEO data.
   */
  const seo = ref({})

  // =================================================================== actions

  /**
   * @method setClipboard
   * @desc Sets the clipboard text. Set to false when no text should be present in the [clipboard](/zero-core/use-zero-store#clipboard).
   * @param {string|boolean} text The text to copy.
   */

  const setClipboard = text => {
    clipboard.value = text
  }

  /**
   * @method setSeo
   * @desc Sets the [seo](/zero-core/use-zero-store#seo) object.
   * @param {Object} content An SEO data object.
   */

  const setSeo = content => {
    seo.value = content
  }

  // ==================================================================== return
  return {
    // ----- state
    clipboard,
    seo,
    // ----- actions
    setClipboard,
    setSeo
  }
})
