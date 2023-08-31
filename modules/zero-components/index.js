console.log('📦 [module] @undone-labs/nuxt-module-zero-components')

// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import Fs from 'fs'

import {
  defineNuxtModule,
  createResolver,
  addPlugin,
  addImports,
  addComponent
} from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

// ////////////////////////////////////////////////////////////////////// Config
// -----------------------------------------------------------------------------
const meta = {
  name: '@undone-labs/nuxt-module-zero-components',
  configKey: 'nuxtModuleZeroComponents',
  compatibility: {
    nuxt: '^3.0.0'
  }
}

// /////////////////////////////////////////////////////////////////// Functions
// -----------------------------------------------------------------------------
// ///////////////////////////////////////////////////////////// registerPlugins
const registerPlugins = (submodule, plugins) => {
  if (!plugins) { return }
  plugins.forEach((plugin) => {
    addPlugin(resolve(`${submodule}/plugins/${plugin.file}`))
  })
}

// ////////////////////////////////////////////////////////// registerComponents
const registerComponents = (submodule, components) => {
  if (!components) { return }
  components.forEach((component) => {
    addComponent({
      name: component.name,
      filePath: resolve(`${submodule}/components/${component.file}`)
    })
  })
}

// ////////////////////////////////////////////////////////////// registerStores
const registerStores = (submodule, stores) => {
  stores.forEach((store) => {
    addImports({
      name: store.name,
      from: resolve(`${submodule}/stores/${store.file}`)
    })
  })
}

// /////////////////////////////////////////////////////////////////////// Setup
// -----------------------------------------------------------------------------
const setup = async () => {
  const modulePath = resolve()
  const submodules = Fs.readdirSync(modulePath)
  const len = submodules.length
  for (let i = 0; i < len; i++) {
    const submodule = submodules[i]
    const path = `${modulePath}/${submodule}`
    if (Fs.statSync(path).isDirectory()) {
      const config = await import(`${path}/index.js`)
      registerPlugins(submodule, config.plugins)
      registerStores(submodule, config.stores)
      registerComponents(submodule, config.components)
    }
  }
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineNuxtModule({
  meta,
  setup
})
