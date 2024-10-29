// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import Fs from 'fs-extra'
import Path from 'path'
import StartCase from 'lodash/startCase'
import KebabCase from 'lodash/kebabCase'
import CamelCase from 'lodash/camelCase'
import Chalk from 'chalk'

import {
  defineNuxtModule,
  createResolver,
  addComponentsDir,
  addComponent,
  addImportsDir,
  addImports,
  addPlugin,
  extendPages,
  addLayout,
  addServerHandler,
  addRouteMiddleware
} from 'nuxt/kit'

const { resolve } = createResolver(import.meta.url)
const globalPrefix = 'Zero'

// ////////////////////////////////////////////////////////////////////// Config
// -----------------------------------------------------------------------------
const meta = {
  name: '@undone-labs/nuxt-module-zero-core',
  configKey: 'nuxtModuleZeroCore',
  compatibility: {
    nuxt: '^3.0.0'
  }
}

// /////////////////////////////////////////////////////////////////// Functions
// -----------------------------------------------------------------------------
/**
 * @method validateKeyMustBeObject
 */

const validateKeyMustBeObject = (entry, key) => {
  if (entry === undefined && entry === null || Array.isArray(entry) || typeof entry !== 'object') {
    throw new Error(`The "${key}" key in the nuxt config must be an object → {}`)
  }
}

/**
 * @method toPascalCase
 */

const convertCase = (string, to = 'kebab') => {
  const startCase = StartCase(string).replaceAll(' ', '')
  if (to === 'pascal') { return startCase }
  if (to === 'kebab') { return KebabCase(startCase) }
  if (to === 'camel') { return CamelCase(startCase) }
  return string
}

/**
 * @method walk
 */

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

/**
 * @method registerComponents
 */

const registerComponents = (path, displayZeroLogs, components) => {
  path = resolve(path, 'components')
  if (!Fs.existsSync(path)) { return }
  if (displayZeroLogs) { console.log(Chalk.bold('     → Components')) }
  if (components) {
    Object.keys(components).forEach(name => {
      const component = components[name]
      const prefixed = `${globalPrefix}${name}`
      if (component.enable) {
        addComponent({
          name: prefixed,
          filePath: resolve(path, `${convertCase(name, 'kebab')}.vue`)
        })
        if (displayZeroLogs) { console.log(Chalk.black(`       <${prefixed} />`)) }
      }
    })
  } else {
    addComponentsDir({
      path,
      global: true
    })
    Fs.readdirSync(path).filter(file => file.includes('.vue')).forEach(component => {
      const name = StartCase(component.replace('.vue', '')).replaceAll(' ', '')
      if (displayZeroLogs) { console.log(Chalk.black(`       <${name} />`)) }
    })
  }
}

/**
 * @method registerComposables
 */

const registerComposables = (path, displayZeroLogs, composables, nuxtOptions) => {
  path = resolve(path, 'composables')
  if (!Fs.existsSync(path)) { return }
  if (displayZeroLogs) { console.log(Chalk.bold('     → Composables')) }
  if (composables) {
    Object.keys(composables).forEach(name => {
      const composable = composables[name]
      if (composable.enable) {
        const slug = KebabCase(name)
        let prefix = composable.prefix
        prefix = prefix && prefix !== '' ? prefix : globalPrefix
        name = convertCase(`${prefix.toLowerCase()}-${name}`, 'camel')
        addImports({
          name: 'default',
          as: name,
          from: resolve(path, slug)
        })
        if (composable.hasOwnProperty('options')) {
          nuxtOptions.runtimeConfig.public[slug] = composable.options
        }
        if (displayZeroLogs) { console.log(Chalk.black(`       ${name}()`)) }
      }
    })
  } else {
    addImportsDir(path)
    Fs.readdirSync(path).filter(file => file.includes('.js')).forEach(composable => {
      const name = CamelCase(composable.replace('.js', ''))
      if (displayZeroLogs) { console.log(Chalk.black(`       ${name}()`)) }
    })
  }
}

/**
 * @method registerPlugins
 */

const registerPlugins = (path, displayZeroLogs, plugins) => {
  path = resolve(path, 'plugins')
  if (!Fs.existsSync(path)) { return }
  if (displayZeroLogs) { console.log(Chalk.bold('     → Plugins')) }
  if (plugins) {
    Object.keys(plugins).forEach(slug => {
      const plugin = plugins[slug]
      if (plugin.enable) {
        addPlugin(resolve(path, slug))
      }
      if (displayZeroLogs) { console.log(Chalk.black(`       ${slug}.js`)) }
    })
  } else {
    Fs.readdirSync(path).filter(file => file.includes('.js')).forEach(plugin => {
      addPlugin(resolve(path, plugin))
      if (displayZeroLogs) { console.log(Chalk.black(`       ${plugin}`)) }
    })
  }
}

/**
 * @method registerStores
 */

const registerStores = (path, displayZeroLogs) => {
  path = resolve(path, 'stores')
  if (!Fs.existsSync(path)) { return }
  if (displayZeroLogs) { console.log(Chalk.bold('     → Stores')) }
  Fs.readdirSync(path).filter(file => file.includes('.js')).forEach(store => {
    const slug = store.split('.js')[0]
    const name = convertCase(slug, 'camel')
    addImports({
      name,
      from: resolve(path, store)
    })
    if (displayZeroLogs) { console.log(Chalk.black(`       ${name}()`)) }
  })
}

/**
 * @method registerServerRoute
 */

const registerServerRoute = (path, displayZeroLogs) => {
  path = resolve(path, 'server', 'api')
  if (!Fs.existsSync(path)) { return }
  if (displayZeroLogs) { console.log(Chalk.bold('     → Server API')) }
  const divider = 'server'
  walk(path, file => {
    const route = file.path.split(divider).pop().replace(file.ext, '')
    addServerHandler({
      route,
      handler: resolve(file.path)
    })
    if (displayZeroLogs) { console.log(Chalk.blue(`       ${route}`)) }
  })
}

/**
 * @method registerPages
 */

const registerPages = (path, displayZeroLogs) => {
  path = resolve(path, 'pages')
  if (!Fs.existsSync(path)) { return }
  if (displayZeroLogs) { console.log(Chalk.bold('     → Routes')) }
  const divider = 'pages'
  walk(path, file => {
    if (file.ext === '.vue') {
      const route = file.path.split(divider).pop().replace(file.ext, '')
      extendPages(pages => {
        pages.push({
          file: file.path,
          name: `Zero${StartCase(route).replaceAll(' ', '')}`,
          path: route
        })
      })
      if (displayZeroLogs) { console.log(Chalk.blue(`       ${route}`)) }
    }
  })
}

/**
 * @method registerLayouts
 */

const registerLayouts = (path, displayZeroLogs) => {
  path = resolve(path, 'layouts')
  if (!Fs.existsSync(path)) { return }
  if (displayZeroLogs) { console.log(Chalk.bold('     → Layouts')) }
  Fs.readdirSync(path).filter(file => file.includes('.vue')).forEach(layout => {
    const slug = layout.split('.vue')[0]
    addLayout({
      filename: layout,
      write: true,
      src: resolve(path, layout),
    }, slug)
    if (displayZeroLogs) { console.log(Chalk.black(`       ${slug}`)) }
  })
}

/**
 * @method registerMiddleware
 */

const registerMiddleware = (path, displayZeroLogs) => {
  path = resolve(path, 'middleware')
  if (!Fs.existsSync(path)) { return }
  if (displayZeroLogs) { console.log(Chalk.bold('     → Middleware')) }
  Fs.readdirSync(path).filter(file => file.includes('.js')).forEach(middleware => {
    const slug = middleware.split('.js')[0]
    addRouteMiddleware({
      name: slug,
      path: resolve(path, middleware),
      global: true
    })
    if (displayZeroLogs) { console.log(Chalk.black(`       ${slug}`)) }
  })
}

// /////////////////////////////////////////////////////////////////////// Setup
// -----------------------------------------------------------------------------
const setup = (_, nuxt) => {
  const nuxtOptions = nuxt.options
  if (!nuxtOptions.hasOwnProperty('zero')) { return }
  const zeroOptions = nuxtOptions.zero
  const displayZeroLogs = zeroOptions?.displayZeroLogs
  const hex1 = '#C36B00'
  const hex2 = '#DB7800'
  const hex3 = '#FFFFFF'
  if (displayZeroLogs) {
    console.log('  ⚡️', `${Chalk.underline.green.bold('load:layer ')}${Chalk.bgGreen.hex(hex3).bold(' zero-core ')}`)
  }
  const basePath = resolve('..')
  validateKeyMustBeObject(zeroOptions, 'zero')
  registerComponents(basePath, displayZeroLogs, zeroOptions.components)
  registerComposables(basePath, displayZeroLogs, zeroOptions.composables, nuxtOptions)
  registerPlugins(basePath, displayZeroLogs, zeroOptions.plugins)
  registerStores(basePath, displayZeroLogs)
  // registerServerRoute(basePath, displayZeroLogs)
  const modulesPath = resolve(basePath, 'modules')
  const modules = Fs.readdirSync(modulesPath)
  const len = modules.length
  for (let i = 0; i < len; i++) {
    const module = modules[i]
    const modulePath = resolve(modulesPath, module)
    if (!Fs.statSync(modulePath).isDirectory()) { continue }
    const moduleOptions = zeroOptions.modules[module] || {}
    if (moduleOptions.enable) {
      if (Fs.statSync(modulePath).isDirectory()) {
        if (displayZeroLogs) {
          console.log('\n  🧰', `${Chalk.underline.hex(hex1).bold('load:module ')}${Chalk.bgHex(hex2).hex(hex3).bold(` ${module} `)}`)
        }
        registerComponents(modulePath, displayZeroLogs)
        registerComposables(modulePath, displayZeroLogs)
        registerPlugins(modulePath, displayZeroLogs)
        registerStores(modulePath, displayZeroLogs)
        registerServerRoute(modulePath, displayZeroLogs)
        registerPages(modulePath, displayZeroLogs)
        registerLayouts(modulePath, displayZeroLogs)
        registerMiddleware(modulePath, displayZeroLogs)
      }
    }
  }
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineNuxtModule({
  meta,
  setup
})
