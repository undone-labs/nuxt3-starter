// ////////////////////////////////////////////////////////////////////// Import
// -----------------------------------------------------------------------------
const fs = require('fs')
const Jsdoc2Md = require('jsdoc-to-markdown')
const Json2Md = require('json2md')
const VueDocs = require('./vue-docgen-api-main-rewrite.cjs')

const SRC_PATH = '../../zero-core/test'
const DEST_PATH = '../content/zero-core/components'

// /////////////////////////////////////////////////////////////////// Functions
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

const populateMarkdownTemplate = async (data) => {
  // console.log(data)
  const props = data.props.length ?
    [
      {
        h3: 'Props'
      },
      {
        table: {
          headers: ['Prop', 'type', 'description', 'values'],
          rows: data.props.map(prop => ({
            Prop: `\`${prop.name}\`${prop.required ? '' : '<span>(optional)</span>'}`,
            type: prop.type.name,
            description: prop.description,
            values: prop.values ? `\`${prop.values}\`` : ''
          }))
        }
      }
    ] : []

  const emits = data.events.length ?
    [
      {
        h3: 'Emitters'
      },
      {
        ul: data.events.map(evt => `${evt.name} - ${evt.description}`)
      }
    ] : []
  
  const slots = data.slots.length ?
    [
      {
        h3: 'Slots'
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
  const methods = data._methods?.length ?
    [
      {
        h3: 'Methods'
      }
    ] : []

  return Json2Md([
    {
      h2: data.displayName
    },
    {
      p: data.description
    },
    ...props,
    ...slots,
    ...emits,
    ...methods
  ])
}

// ---------------------------------------------------------------- parseVueFile
const writeMdFile = async (path, data) => {
  return new Promise((resolve, reject) => {
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

// ------------------------------------------------------- generateDocumentation
const generateDocumentation = async () => {
  new Promise((resolve, reject) => {
    fs.readdir(SRC_PATH, async (err, files) => {
      if (err) {
        console.log(err)
        reject()
      } else {
        const len = files.length
        for (let i = 0; i < len; i++) {
          const path = files[i]
          const filename = path.split('.')[0]
          const ext = path.split('.')[1]
          if (ext === 'js') {
            const parsed = await parseJsFile(`${SRC_PATH}/${path}`)
            if (parsed) {
              await writeMdFile(`${DEST_PATH}/${filename}.md`, parsed)
            }
          } else if (ext === 'vue') {
            const parsed = await parseVueFile(`${SRC_PATH}/${path}`)
            if (parsed) {
              const md = await populateMarkdownTemplate(parsed)
              if (md) {
                await writeMdFile(`${DEST_PATH}/${filename}.md`, md)
              }
            }
          }
        }
        resolve()
      }
    })
  })
}

// ////////////////////////////////////////////////////////////// Initialization
// -----------------------------------------------------------------------------
generateDocumentation()





