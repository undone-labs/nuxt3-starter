// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import {
  defineNuxtModule
} from 'nuxt/kit'

// ////////////////////////////////////////////////////////////////////// Config
// -----------------------------------------------------------------------------
const meta = {
  name: '@undone-labs/nuxt-module-zero-core/auth',
  configKey: 'nuxtModuleZeroCoreAuth',
  compatibility: {
    nuxt: '^3.0.0'
  }
}

// /////////////////////////////////////////////////////////////////// Functions
// -----------------------------------------------------------------------------
/**
 * @method addOptionsToRuntimeConfig
 */

const addOptionsToRuntimeConfig = (nuxtOptions, options) => {
  nuxtOptions.runtimeConfig.public.auth = {
    redirectAfterLogout: options.redirectAfterLogout,
    configurationUrl: options.configurationUrl,
    github: options.github
  }
}

// /////////////////////////////////////////////////////////////////////// Setup
// -----------------------------------------------------------------------------
const setup = (_, nuxt) => {
  const nuxtOptions = nuxt.options
  const options = nuxtOptions.zero.modules?.auth
  if (!options?.enable) { return }
  addOptionsToRuntimeConfig(nuxtOptions, options)
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineNuxtModule({
  meta,
  setup
})
