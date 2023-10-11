console.log('📦 [load:module] zero')

// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import Fs from 'fs'
import Path from 'path'

import {
  defineNuxtModule,
  createResolver,
  addPlugin,
  addImports,
  addImportsDir,
  addComponent,
  extendPages,
  addLayout,
  addServerHandler,
  addRouteMiddleware
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
// ///////////////////////////////////////////// addEntriesToPublicRuntimeConfig
const addEntriesToPublicRuntimeConfig = (nuxt) => {
  const algolia = nuxt.options.algolia
  nuxt.options.runtimeConfig.public.algolia.indexName = algolia.indexName
  nuxt.options.runtimeConfig.public.algolia.disable = algolia.disable || false
  nuxt.options.runtimeConfig.public.auth = nuxt.options.auth
}

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

// //////////////////////////////////////////////////////////////////////// walk
const walk = (dir, next) => {
  Fs.readdirSync(dir, { withFileTypes: true }).forEach(dirEnt => {
    const name = dirEnt.name
    const path = resolve(dirEnt.path, dirEnt.name)
    const ext = Path.extname(name).toLowerCase()
    const isDirectory = Fs.statSync(path).isDirectory()
    isDirectory ?
      walk(path, next) :
      next({
        path,
        name,
        ext
      })
  })
}

// /////////////////////////////////////////////////////////////// registerPages
const registerPages = (path) => {
  path = resolve(path, 'pages')
  if (!Fs.existsSync(path)) { return }
  walk(path, file => {
    if (file.ext === '.vue') {
      let route = file.path.split('pages').pop().replace('.vue', '')
      if (route.includes('/index')) {
        route = route.replace('/index', '')
      }
      const entry = {
        file: file.path,
        name: `Zero${useUnSlugify(route.replaceAll('-', '/'), 'pascal-case', '/')}`,
        path: route
      }
      extendPages(pages => {
        pages.push(entry)
      })
    }
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

// ///////////////////////////////////////////////////////// registerComposables
const registerComposables = (path) => {
  path = resolve(path, 'composables')
  if (!Fs.existsSync(path)) { return }
  addImportsDir(path)
}

// ////////////////////////////////////////////////////////////// registerServer
const registerServer = (path) => {
  path = resolve(path, 'server')
  if (!Fs.existsSync(path)) { return }
  Fs.readdirSync(path).filter(file => file.includes('.js')).forEach(routeFileName => {
    const route = routeFileName.split('.js')[0].replaceAll(':', '/')
    addServerHandler({
      route,
      handler: resolve(path, routeFileName)
    })
  })
}

// ////////////////////////////////////////////////////////// registerMiddleware
const registerMiddleware = (path) => {
  path = resolve(path, 'middleware')
  if (!Fs.existsSync(path)) { return }
  Fs.readdirSync(path).filter(file => file.includes('.js')).forEach(middlewareFileName => {
    const slug = middlewareFileName.split('.js')[0]
    addRouteMiddleware({
      name: slug,
      path: resolve(path, middlewareFileName),
      global: true
    })
  })
}

// /////////////////////////////////////////////////////////////////////// Setup
// -----------------------------------------------------------------------------
const setup = async (_, nuxt) => {
  addEntriesToPublicRuntimeConfig(nuxt)
  const commandAllowlist = ['dev'] // only load kitchen-sink for these commands (re: not `build` or `generate`)
  const basePath = resolve()
  const subModulePath = resolve('modules')
  const submodules = Fs.readdirSync(subModulePath)
  const len = submodules.length
  for (let i = 0; i < len; i++) {
    const submodule = submodules[i]
    if (submodule === 'kitchen-sink' && !commandAllowlist.includes(process.env.npm_lifecycle_event)) { continue }
    const path = resolve(subModulePath, submodule)
    if (Fs.statSync(path).isDirectory()) {
      console.log(`🧰 [zero:submodule] ${submodule}`)
      const moduleScriptPath = resolve(path, 'index.js')
      if (Fs.existsSync(moduleScriptPath)) {
        await import(moduleScriptPath)
      }
      registerComposables(path)
      registerPlugins(path)
      registerComponents(path)
      registerLayouts(path)
      registerPages(path)
      registerContentDirectories(nuxt, path, submodule)
      registerServer(path)
      registerMiddleware(path)
      registerStores(path)
    }
  }
  registerComposables(basePath)
  registerPlugins(basePath, true)
  registerComponents(basePath, true)
  registerLayouts(basePath, true)
  registerPages(basePath, true)
  registerContentDirectories(nuxt, basePath)
  registerMiddleware(basePath)
  registerStores(basePath, true)
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineNuxtModule({
  meta,
  setup
})
