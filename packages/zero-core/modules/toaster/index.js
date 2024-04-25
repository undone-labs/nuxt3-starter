// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import Chalk from 'chalk'

import {
  defineNuxtModule
} from 'nuxt/kit'

// /////////////////////////////////////////////////////////////////// Functions
// -----------------------------------------------------------------------------
/**
 * @method addOptionsToRuntimeConfig
 */

const addOptionsToRuntimeConfig = (nuxtOptions, options) => {
  nuxtOptions.runtimeConfig.public.toaster = options
}

// /////////////////////////////////////////////////////////////////////// Setup
// -----------------------------------------------------------------------------
const setup = async (_, nuxt) => {
  const options = nuxt.options.zero.modules.toaster || {}
  if (!options.enable) { return }
  addOptionsToRuntimeConfig(nuxt.options, options)
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineNuxtModule({
  setup
})
