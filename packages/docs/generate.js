// ////////////////////////////////////////////////////////////////////// Import
// -----------------------------------------------------------------------------
import fs from 'fs'
import Jsdoc2Md from 'jsdoc-to-markdown'
import Json2Md from 'json2md'
import VueDocs from './plugins/vue-docgen-api-rewrite.cjs'
import { capitalCase } from 'change-case'

const SRC_PATH = '../zero-core'
const DEST_PATH = 'content/zero-core'

const excludeList = [
  '../zero-core/node_modules',
  '../zero-core/assets',
  '../zero-core/deprecated',
  '../zero-core/pages',
  '../zero-core/nuxt.config.js',
  '../zero-core/error.vue'
]
const concatenateList = [
  {
    dir: 'modules/accordion/components',
    filename: 'components'
  },
  {
    dir: 'modules/accordion/stores',
    filename: 'store'
  },
  {
    dir: 'modules/alert/components',
    filename: 'components'
  },
  {
    dir: 'modules/alert/stores',
    filename: 'store'
  },
  {
    dir: 'modules/auth/composables',
    filename: 'composables'
  },
  {
    dir: 'modules/auth/layouts',
    filename: 'layouts'
  },
  {
    dir: 'modules/auth/middleware',
    filename: 'middleware'
  },
  {
    dir: 'modules/auth/plugins',
    filename: 'plugins'
  },
  {
    dir: 'modules/button/components',
    filename: 'components'
  },
  {
    dir: 'modules/button/stores',
    filename: 'store'
  },
  {
    dir: 'modules/form/components',
    filename: 'components'
  },
  {
    dir: 'modules/form/composables',
    filename: 'composables'
  },
  {
    dir: 'modules/form/stores',
    filename: 'store'
  },
  {
    dir: 'modules/toaster/components',
    filename: 'components'
  },
  {
    dir: 'modules/toaster/stores',
    filename: 'store'
  },
  {
    dir: 'modules/websocket/plugins',
    filename: 'plugins'
  },
  {
    dir: 'modules/websocket/stores',
    filename: 'store'
  },
  {
    dir: 'plugins',
    filename: 'plugins'
  }
]

// /////////////////////////////////////////////////////////////////// Functions
// ------------------------------------------------------------- trimDescription
const trimDescription = (desc) => {
  return desc.charAt(0) === '-' ? desc.substring(1, desc.length).trim() : desc.trim()
}

// ----------------------------------------------------------------- parseJsFile
const parseJsFile = async (path) => {
  return new Promise((resolve, reject) => {
    Jsdoc2Md.render({ files: path })
      .then((data) => { resolve(data) })
      .catch((err) => {
        console.log(err)
        reject()
      })
  })
}

// ---------------------------------------------------------------- parseVueFile
const parseVueFile = async (path) => {
  return new Promise((resolve, reject) => {
    VueDocs.parse(path)
      .then((data) => { resolve(data) })
      .catch((err) => {
        console.log(err)
        reject()
      })
  })
}

// ---------------------------------------------------- populateMarkdownTemplate
const populateMarkdownTemplate = async (data) => {
  const props = data.props?.length ?
    [
      {
        h2: 'Props'
      },
      {
        table: {
          headers: ['Prop', 'type', 'description', 'values'],
          rows: data.props.map(prop => ({
            Prop: `\`${prop.name}\`${prop.required ? '' : '<span>(optional)</span>'}`,
            type: prop.type.name || '',
            description: prop.description || '',
            values: prop.values ? `\`${prop.values}\`` : ''
          }))
        }
      }
    ] : []

  const slots = data.slots?.length ?
    [
      {
        h2: 'Slots'
      },
      {
        table: {
          headers: ['name', 'scoped', 'bindings'],
          rows: data.slots.map(slot => ({
            name: slot.name,
            scoped: `\`${!!slot.scoped}\``,
            bindings: Array.isArray(slot.bindings) ? slot.bindings.map(binding => `\`${binding.name}\``).join(' ') : ''
          }))
        }
      }
    ] : []

  const emits = data.events?.length ?
    [
      {
        h3: 'Emitters'
      },
      {
        ul: data.events.map(evt => `${evt.name} - ${evt.description}`)
      }
    ] : []

  const methods = data._methods?.length ?
    [
      {
        h2: 'Methods'
      },
      ...data._methods.map(item => {
        const output = [{ h5: item.method.name + '()' }]
        const description = item.method.description || item.desc?.description
        const params = item.param
        if (description) {
          output[1] = { p: trimDescription(description) }
        }
        if (params) {
          output[2] = {
            table: {
              headers: ['param', 'type', 'description'],
              rows: params.map(param => ({
                param: `\`${param.name}\`${param.optional ? '<span>(optional)</span>' : '' }`,
                type: param.type,
                description: trimDescription(param.description)
              }))
            }
          }
        }
        Object.keys(item).forEach((key) => {
          if (key === 'method' || key === 'desc' || key === 'param') {
            return
          }
          output.push({
            ul: item[key].map(tag => `**${tag.tag}:** ${tag.name} ${tag.description}`)
          })
        })
        return output
      })
    ] : []

  const toConvert = [
    {
      h1: capitalCase(data.displayName)
    },
    {
      p: data.description
    },
    ...props,
    ...slots,
    ...emits,
    ...methods
  ]
  return Json2Md(toConvert)
}

// ---------------------------------------------------------------- parseVueFile
const writeMdFile = async (path, data) => {
  return new Promise((resolve, reject) => {
    const split = path.split('/')
    const dir = split.slice(0, split.length - 1).join('/')
    if (!fs.existsSync(dir)) { fs.mkdirSync(dir, { recursive: true }) }
    fs.writeFile(path, data, (err) => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        console.log(`Markdown file generated at ${path}`)
        resolve()
      }
    })
  })
}

// ---------------------------------------------------------------- parseVueFile
const concatenateContentsToMarkdown = async (dir, filename) => {
  let concatenated = ''
  const entries = await fs.promises.readdir(dir)
  const len = entries.length
  for (let i = 0; i < len; i++) {
    const entry = entries[i]
    const path = `${dir}/${entry}`
    const stats = await fs.promises.stat(path)
    if (stats.isFile()) {
      let data = ''
      const ext = entry.split('.')[1]
      if (ext === 'js') {
        data = await parseJsFile(path)
      } else if (ext === 'vue') {
        const parsed = await parseVueFile(path)
        data = await populateMarkdownTemplate(parsed)
      }
      concatenated = concatenated + '\n' + data
    }
  }
  const split = dir.replace(SRC_PATH, DEST_PATH).split('/')
  const dest = split.slice(0, split.length - 1).join('/') + `/${filename}.md`
  await writeMdFile(dest, concatenated)
}

// ------------------------------------------------------ parseDirectoryContents
const parseDirectoryContents = async dir => {
  const entries = await fs.promises.readdir(dir)
  const len = entries.length
  for (let i = 0; i < len; i++) {
    const entry = entries[i]
    const path = `${dir}/${entry}`
    if (excludeList.includes(path)) { continue }
    const stats = await fs.promises.stat(path)
    if (stats.isFile()) {
      const ext = entry.split('.')[1]
      const dest = path.replace(SRC_PATH, DEST_PATH).replace(`.${ext}`, '.md')
      if (ext === 'js') {
        const parsed = await parseJsFile(path)
        if (parsed) {
          await writeMdFile(dest, parsed)
        }
      } else if (ext === 'vue') {
        const parsed = await parseVueFile(path)
        if (parsed) {
          const md = await populateMarkdownTemplate(parsed)
          if (md) {
            await writeMdFile(dest, md)
          }
        }
      }
    } else if (stats.isDirectory()) {
      const subdir = concatenateList.find(item => `${SRC_PATH}/${item.dir}` === path)
      if (subdir) {
        await concatenateContentsToMarkdown(path, subdir.filename)
      } else {
        await parseDirectoryContents(path)
      }
    }
  }
}

// ------------------------------------------------------- generateDocumentation
const generateDocumentation = async () => {
  await parseDirectoryContents(SRC_PATH)
}

// ////////////////////////////////////////////////////////////// Initialization
// -----------------------------------------------------------------------------
generateDocumentation()
