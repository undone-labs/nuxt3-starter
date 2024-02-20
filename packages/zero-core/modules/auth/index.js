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
 * @method validateKeys
 */

const validateKeys = options => {
  const redirectUnauthenticated = options.redirectUnauthenticated
  if (!redirectUnauthenticated || redirectUnauthenticated === '') {
    throw new Error(`The \`zero.modules.auth.redirectUnauthenticated\` key in the nuxt config must exist and must point to an active route`)
  }
}

/**
 * @method addOptionsToRuntimeConfig
 */

const addOptionsToRuntimeConfig = (nuxtOptions, options) => {
  nuxtOptions.runtimeConfig.public.auth = {
    redirectUnauthenticated: options.redirectUnauthenticated,
    redirectAfterLogin: options.redirectAfterLogin,
    redirectAfterLogout: options.redirectAfterLogout,
    github: options.github
  }
}

// /////////////////////////////////////////////////////////////////////// Setup
// -----------------------------------------------------------------------------
const setup = (_, nuxt) => {
  const nuxtOptions = nuxt.options
  const options = nuxtOptions.zero.modules?.auth
  if (!options?.enable) { return }
  validateKeys(options)
  addOptionsToRuntimeConfig(nuxtOptions, options)
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineNuxtModule({
  meta,
  setup
})
