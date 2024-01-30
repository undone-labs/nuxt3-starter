// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import Path from 'path'
import Fs from 'fs-extra'
import Chalk from 'chalk'
import StartCase from 'lodash/startCase'

import {
  createResolver,
  defineNuxtModule,
  addComponent
} from 'nuxt/kit'

const { resolve } = createResolver(import.meta.url)

// ////////////////////////////////////////////////////////////////////// Config
// -----------------------------------------------------------------------------
const meta = {
  name: '@undone-labs/nuxt-module-zero-docs',
  configKey: 'nuxtModuleZeroDocs',
  compatibility: {
    nuxt: '^3.0.0'
  }
}

// /////////////////////////////////////////////////////////////////// Functions
// -----------------------------------------------------------------------------
/**
 * @method checkIfTargetDocsDirectoryExists
 */

const checkIfTargetDocsDirectoryExists = options => {
  const sources = options.sources
  const exists = Fs.existsSync(sources.targetDocs.base)
  if (exists) {
    delete sources.srcDocs
  } else {
    delete sources.targetDocs
  }
}

/**
 * @method checkIfTargetDataDirectoryExists
 */

const checkIfTargetDataDirectoryExists = options => {
  const sources = options.sources
  const exists = Fs.existsSync(sources.targetData.base)
  if (exists) {
    delete sources.srcData
  } else {
    delete sources.targetData
  }
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

const registerComponents = source => {
  const split = source.path
  walk(source.base, file => {
    if (file.ext === '.vue') {
      const path = file.path
      const name = file.name
      const split = path.split(`${source.prefix}/content/`).pop().split('/')
      const compiled = []
      split.forEach(entry => {
        let output = entry.replace('.vue', '').trim().replace(/^(\d+.)/, '').trim()
        output = StartCase(output).replaceAll(' ', '')
        compiled.push(output)
      })
      addComponent({
        name: `Preview${compiled.join('')}`,
        filePath: resolve(path),
        global: true
      })
    }
  })
}

// /////////////////////////////////////////////////////////////////////// Setup
// -----------------------------------------------------------------------------
const setup = async (_, nuxt) => {
  console.log('\n  ⚡️', `${Chalk.underline.green.bold('load:layer ')}${Chalk.bgGreen.hex('#FFFFFF').bold(' zero-docs ')}\n`)
  const options = nuxt.options
  checkIfTargetDocsDirectoryExists(options.content)
  checkIfTargetDataDirectoryExists(options.content)
  const sources = options.content.sources
  registerComponents(sources.srcDocs || sources.targetDocs)
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineNuxtModule({
  meta,
  setup
})
