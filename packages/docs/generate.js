// ////////////////////////////////////////////////////////////////////// Import
// -----------------------------------------------------------------------------
import fs from 'fs'
import Jsdoc2Md from 'jsdoc-to-markdown'
import Json2Md from 'json2md'
import VueDocs from './plugins/vue-docgen-api-rewrite.cjs'
import dmd from 'dmd'
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
  },
  {
    dir: 'stores',
    filename: 'use-zero-store'
  }
]

// /////////////////////////////////////////////////////////////////// Functions
// ------------------------------------------------------------- trimDescription
const trimDescription = (desc) => {
  return desc.charAt(0) === '-' ? desc.substring(1, desc.length).trim() : desc.trim()
}

// ----------------------------------------------------------------- parseJsFile
const parseJsFile = async (path) => {
  return await new Promise((resolve, reject) => {    
    Jsdoc2Md.getTemplateData({ files: path })
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

// ------------------------------------------------------- formatPropDescription
const formatPropDescription = prop => {
  let desc = prop.description
  if (!desc) {
    return ''
  }
  let li =''
  if (prop.tags && Array.isArray(prop.tags.params)) {
    const params = prop.tags.params
    params.forEach((param) => {
      li = li + `<li>\`${param.name}\` - **type:** \`${param.type.name}\` - ${param.description}</li>`
    })
  }
  return `${desc}<ul>${li}</ul>`
}

// ---------------------------------------------------------------- getEventTags
const getEventTags = evt => {
  if (!Array.isArray(evt.tags)) {
    return ''
  }
  const returnTags = evt.tags.filter(tag => tag.title === 'return' || tag.title === 'returns')
  if (returnTags.length) {
    const type = returnTags[0].type?.name
    const elements = returnTags[0].type?.elements
    const values = Array.isArray(elements) ? elements.map(el => el.name).join('|') : ''
    return `- returns: \`${values || type}\` `
  }
  return ''
}

// --------------------------------------------------------- getMarkdownElements
const getMarkdownElements = (methods, isComputed = false) => {
  if (!Array.isArray(methods)) {
    return []
  }
  const array = isComputed ? methods.filter(item => item.hasOwnProperty('computed')) : methods.filter(item => !item.hasOwnProperty('computed'))
  if (array.length) {
    const markdownElements = array.map(item => {
      const output = [{ h4: item.method.name + '()' }]
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
        if (key === 'computed' || key === 'method' || key === 'desc' || key === 'param') {
          return
        }
        output.push({
          ul: item[key].map(tag => {
            const type = tag.type ? `\`${tag.type}\` ` : ''
            return `**${tag.tag}:** ${type}${tag.name} ${tag.description}`
          })
        })
      })
      return output
    })
    return markdownElements
  }
  return []
}

// ---------------------------------------------------- populateJsFileMdTemplate
const populateJsFileMdTemplate = async data => {
  const toConvert = []
  if (Array.isArray(data) && data.length) {
    const moduleData = data.find(item => item.kind === 'module')
    if (moduleData) {
      // console.log(data)
      const moduleName = moduleData.name
      const title = moduleName.startsWith('use') ? moduleName + '()' : moduleName
      toConvert.push({ h1: title }, { p: trimDescription(moduleData.description || '') })
      const membersData = data.filter(item => item.kind !== 'module' && item.kind !== 'function')
      const methodsData = data.filter(item => item.kind === 'function')

      if (membersData.length) {
        toConvert.push({ h2: 'Data' }, { ul: membersData.map(item => `[${item.name}](#${item.name.toLowerCase()})`)})
      }

      if (methodsData.length) {
        toConvert.push({ h2: 'Methods' }, { ul: methodsData.map(item => `[${item.name}()](#${item.name.toLowerCase()})`)})
      }

      if (membersData.length || methodsData.length) {
        toConvert.push({ h2: 'All Members '})
      }

      const members = membersData.map(item => ([
        { h4: item.name },
        { p: item.type?.names?.length ? `**type:** \`${item.type.names.join('|')}\`` : '' },
        { p: trimDescription(item.description || '') },
        { p: `**Kind:** ${item.scope} ${item.kind === 'function' ? 'method' : item.kind} of [${moduleName}](#${moduleName.toLowerCase()})` }
      ]))
      toConvert.push(...members)
      
      const methods = methodsData.map(item => {
        const elements = [
          { h4: item.name + '()' },
          { p: trimDescription(item.description || '') },
          { p: `**Kind:** ${item.scope} ${item.kind === 'function' ? 'method' : item.kind} of [${moduleName}](#${moduleName.toLowerCase()})` }
        ]
        if (item.params?.length) {
          elements.push({
            table: {
              headers: ['param', 'type', 'description'],
              rows: item.params.map(param => ({
                param: `\`${param.name}\`${param.optional ? '<span>(optional)</span>' : '' }`,
                type: param.type.names.join('|'),
                description: trimDescription(param.description || '')
              }))
            }
          })
        }
        if (item.returns?.length) {
          elements.push({ ul: item.returns.map(rtn => `**Returns:** \`${rtn.type.names.join('|')}\``)})
        }
        return elements
      })
      toConvert.push(...methods)
    }
  }
  return Json2Md(toConvert)
}

// ---------------------------------------------- populateVueComponentMdTemplate
const populateVueComponentMdTemplate = async (data) => {
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
            description: formatPropDescription(prop),
            values: prop.values ? `\`${prop.values}\`` : ''
          }))
        }
      }
    ] : []

  let slots = []
  if (data.slots?.length) {
    slots = [{ h2: 'Slots'}]
    data.slots.forEach((slot) => {
      const slotData = []
      if (slot.name) {
        slotData.push({ h4: capitalCase(slot.name) }, { p: `**name:** \`${slot.name}\`  **scoped:** \`${!!slot.scoped}\`` })
      }
      if (slot.description) {
        slotData.push({ p: slot.description })
      }
      if (slot.bindings?.length) {
        const bindings = slot.bindings.map(binding => ({
          binding: `\`${binding.name}\``,
          type: binding.type ? `\`${binding.type.name}\`` : '',
          description: binding.description || ''
        }))
        slotData.push({
          table: {
            headers: ['binding', 'type', 'description'],
            rows: bindings
          }
        })
      }
      slots = slots.concat(slotData)
    })
  }

  const emits = data.events?.length ?
    [
      {
        h2: 'Emitters'
      },
      {
        ul: data.events.map(evt => `**${evt.name}** ${getEventTags(evt)}- ${evt.description}`)
      }
    ] : []

  const methodElements = getMarkdownElements(data._methods)
  const methods = methodElements.length ?
    [
      {
        h2: 'Methods'
      },
      ...methodElements
    ] : []

  const computedElements = getMarkdownElements(data._methods, true)
  const computed = computedElements.length ?
    [
      {
        h2: 'Computed properties'
      },
      ...computedElements
    ] : []

  const toConvert = [
    {
      h1: capitalCase(data.displayName)
    },
    {
      p: data.description
    },
    ...props,
    ...computed,
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
        const parsed = await parseJsFile(path)
        data = await populateJsFileMdTemplate(parsed)
      } else if (ext === 'vue') {
        const parsed = await parseVueFile(path)
        data = await populateVueComponentMdTemplate(parsed)
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
          const md = await populateJsFileMdTemplate(parsed)
          if (md) {
            await writeMdFile(dest, md)
          }
        }
      } else if (ext === 'vue') {
        const parsed = await parseVueFile(path)
        if (parsed) {
          const md = await populateVueComponentMdTemplate(parsed)
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
