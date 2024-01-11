/**
 * @note ❗️DO NOT DELETE THIS MODULE
 */

// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import Chalk from 'chalk'

import {
  defineNuxtModule
} from 'nuxt/kit'

// ////////////////////////////////////////////////////////////////////// Config
// -----------------------------------------------------------------------------
const meta = {
  name: '@undone-labs/nuxt-module-zero-ui',
  configKey: 'nuxtModuleZeroUi',
  compatibility: {
    nuxt: '^3.0.0'
  }
}

// /////////////////////////////////////////////////////////////////////// Setup
// -----------------------------------------------------------------------------
const setup = (_, nuxt) => {
  const hex1 = '#3e1c00'
  const hex2 = '#3e1c00'
  const hex3 = '#FFFFFF'
  console.log('\n  ⚡️', `${Chalk.underline.hex(hex1).bold('load:package ')}${Chalk.bgHex(hex2).hex(hex3).bold(' zero-ui ')}\n`)
  const options = nuxt.options
  options.css = options.css.reverse()
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineNuxtModule({
  meta,
  setup
})
