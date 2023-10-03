console.log('📦 [load:module] zero')

// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import Fs from 'fs'

import {
  defineNuxtModule,
  createResolver,
  addPlugin,
  addImports,
  addComponent,
  extendPages,
  addLayout
} from 'nuxt/kit'

const { resolve } = createResolver(import.meta.url)

import { useUnSlugify } from './composables/use-unslugify'

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
const registerPlugins = (path, log = false) => {
  path = resolve(path, 'plugins')
  if (!Fs.existsSync(path)) { return }
  Fs.readdirSync(path).filter(file => file.includes('.js')).forEach(plugin => {
    addPlugin(resolve(path, plugin))
    if (log) { console.log(`🔌 [zero:plugin] ${plugin.split('.js')[0]}`) }
  })
}

// ////////////////////////////////////////////////////////// registerComponents
const registerComponents = (path, log = false) => {
  path = resolve(path, 'components')
  if (!Fs.existsSync(path)) { return }
  Fs.readdirSync(path).filter(file => file.includes('.vue')).forEach(component => {
    const name = component.split('.vue')[0]
    // const name = `Zero${useUnSlugify(`${prefix}-${slug}`)}`
    addComponent({
      name,
      filePath: resolve(path, component)
    })
    if (log) { console.log(`🧩 [zero:component] ${name}`) }
  })
}

// ////////////////////////////////////////////////////////////// registerStores
const registerStores = (path, log = false) => {
  path = resolve(path, 'stores')
  if (!Fs.existsSync(path)) { return }
  Fs.readdirSync(path).filter(file => file.includes('.js')).forEach(store => {
    const slug = store.split('.js')[0]
    addImports({
      name: useUnSlugify(slug, 'camel-case'),
      from: resolve(path, store)
    })
    if (log) { console.log(`🧺 [zero:store] ${slug}`) }
  })
}

// ///////////////////////////////////////////////////////////// registerLayouts
const registerLayouts = (path, log = false) => {
  path = resolve(path, 'layouts')
  if (!Fs.existsSync(path)) { return }
  Fs.readdirSync(path).filter(file => file.includes('.vue')).forEach(layout => {
    const slug = layout.split('.vue')[0]
    addLayout({
      filename: layout,
      write: true,
      src: resolve(path, layout),
    }, slug)
    if (log) { console.log(`🗾 [zero:layout] ${slug}`) }
  })
}

// /////////////////////////////////////////////////////////////// registerPages
const registerPages = (nuxtConfig, path, log = false) => {
  path = resolve(path, 'pages')
  if (!Fs.existsSync(path)) { return }
  Fs.readdirSync(path).filter(file => file.includes('.vue')).forEach(page => {
    const route = page.split('.vue')[0].replaceAll(':', '/')
    const entry = {
      file: resolve(path, page),
      name: route === '/' ? 'ZeroKitchenSinkIndex' : `ZeroKitchenSink${useUnSlugify(route.replaceAll('/', '-'), 'proper-case')}`,
      path: route === '/' ? '/zero-kitchen-sink' : `/zero-kitchen-sink${route}`
    }
    extendPages(pages => {
      pages.push(entry)
    })
    if (log) { console.log(`📄 [zero:page] ${route}`) }
  })
}

// ////////////////////////////////////////////////// registerContentDirectories
const registerContentDirectories = (nuxt, path, tag) => {
  path = resolve(path, 'content')
  if (!Fs.existsSync(path)) { return }
  if (!nuxt.options.hasOwnProperty('content')) {
    nuxt.options.content = {}
  }
  const sources = nuxt.options.content.sources || {}
  nuxt.options.content.sources = Object.assign(sources, {
    [useUnSlugify(tag, 'camel-case')]: {
      driver: 'fs',
      prefix: `/zero/${tag}`, // All content inside this source will be prefixed with this
      base: path
    }
  })
}

// /////////////////////////////////////////////////////////////////////// Setup
// -----------------------------------------------------------------------------
const setup = async (_, nuxt) => {
  const nuxtConfig = nuxt.options
  const basePath = resolve()
  const subModulePath = resolve('modules')
  Fs.readdirSync(subModulePath).forEach(submodule => {
    const path = resolve(subModulePath, submodule)
    if (Fs.statSync(path).isDirectory()) {
      console.log(`🧰 [zero:submodule] ${submodule}`)
      registerPlugins(path)
      registerStores(path)
      registerComponents(path)
      registerLayouts(path)
      registerPages(nuxtConfig, path)
      registerContentDirectories(nuxt, path, submodule)
    }
  })
  registerPlugins(basePath, true)
  registerStores(basePath, true)
  registerComponents(basePath, true)
  registerLayouts(basePath, true)
  registerPages(nuxtConfig, basePath, true)
  registerContentDirectories(nuxt, basePath)
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineNuxtModule({
  meta,
  setup
})
