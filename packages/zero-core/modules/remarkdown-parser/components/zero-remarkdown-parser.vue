<template>
  <!-- <div class="markdown" >
    welp
  </div> -->
  <div class="markdown" v-html="parsed" />
</template>

<script setup>
// ===================================================================== Imports
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import rehypeRewrite from 'rehype-rewrite'
import rehypeStringify from 'rehype-stringify'
// import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'

import { useChangeCase } from '@vueuse/integrations/useChangeCase'
import { unref } from 'vue'

// ======================================================================== Data
const props = defineProps({
  markdown: { // markdown string
    type: String,
    required: true
  },
  disableHeadingLinks: {
    type: Boolean,
    required: false,
    default: false
  },
  sectionDividers: {
    type: Boolean,
    required: false,
    default: true
  }
})

const parsed = ref(null)
const processor = ref(null)
const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const baseURL = `${runtimeConfig.public.siteUrl}${route.path}`
const textCopied = 'Copied!'
const textNotCopiedUrl = 'Click to copy link'
const textNotCopiedCode = 'Copy'
const zeroStore = useZeroStore()
let copyButtons = []


// ============================================================= Setup Processor
processor.value = unified()
  .use(remarkParse)
  .use(remarkMath)
  .use(remarkRehype)
  .use(rehypeKatex)
  .use(rehypeHighlight)
  .use(rehypeRewrite, {
    rewrite: (node, index, parent) => {
      // if (index === 0 && parent.type === 'root') {
        // console.log('parent ', parent)
      // }
      if (node.type === 'element') {
        if (node.tagName.startsWith('h') ) {
          const id = unref(useChangeCase([...node.children].find(child => child.type === 'text').value, 'paramCase'))
          node = useAddHeadingClasses(node, id)
          if (!props.disableHeadingLinks) {
            node = useAddCopyButton(node, id)
          }
        }
        // if (node.tagName === 'pre') {
        //   Array.isArray(node.properties.className)
        //   ? node.properties.className.push('code-wrapper')
        //   : node.properties.className = ['code-wrapper' ]
        //   node.children.splice( 0, 0,
        //     {
        //       type: 'element',
        //       tagName: 'button',
        //       properties: {
        //         className: ['copy-button'],
        //         'data-type': 'code'
        //       },
        //       children: [{ type: 'text', value: 'Copy' }]
        //     }
        //   )
        // }
        // if (node.tagName === 'code') {
        //   if (parent.tagName === 'pre') {
        //     Array.isArray(node.properties.className)
        //     ? node.properties.className.push('code-block')
        //     : node.properties.className = ['code-block' ]
        //     const language = [...node.properties.className].find(str => str.startsWith('language-'))
        //     if (language) {
        //       parent.properties['data-language'] = language.replace('language-', '')
        //     }
        //   }
        // }
      }
    }
  })
  .use(rehypeStringify)

// ============================================================ Process Markdown
processor.value.process(props.markdown, (err, file) => {
  if (err) { console.log('error during parsing ', err) }
  if (file.value) { parsed.value = file.value }
})



/**
 * @method splitOutputIntoSections
 */

//  const splitOutputIntoSections = (parsed) => {
//   const content = parsed.split(/(<h\d{1})/g)
//   const sectionIndexes = []
//   content.forEach((element, index) => {
//     if (element.startsWith('<h')) {
//       sectionIndexes.splice(0, 0, index)
//     }
//   })
//   const sectionedOutput = [...content]
//   sectionIndexes.forEach((element, index) => {
//     if (index === 0) {
//       sectionedOutput.push('</section>')
//     }
//     if (props.sectionDividers && index !== (sectionIndexes.length -1)) {
//       sectionedOutput.splice(element, 0, '<section><hr>')
//     } else {
//       sectionedOutput.splice(element, 0, '<section>')
//     }
//     if (index !== (sectionIndexes.length -1)) {
//       sectionedOutput.splice(element, 0, '</section>')
//     }
//   })
//   return sectionedOutput.join('')
// }



// ===================================================================== Methods
/**
 * @method initializeCopyButtons
 */

 const initializeCopyButtons = () => {
  copyButtons = document.querySelectorAll('.markdown .copy-button')

  const len = copyButtons.length
  for (let i = 0; i < len; i++) {
    const button = copyButtons[i]
    const hash = button.getAttribute('data-hash')
    const type = button.getAttribute('data-type')
    button.addEventListener('click', () => {
      const text = type === 'heading' ? `${baseURL}#${hash}` : button.nextElementSibling.textContent
      zeroAddTextToClipboard(text)
      zeroStore.setClipboard(text)
      clearCopiedStates()
      type === 'heading' ?
        button.setAttribute('data-tooltip', textCopied) :
        button.innerText = textCopied
    })
  }
}

/**
 * @method clearCopiedStates
 */

 const clearCopiedStates = () => {
  const len = copyButtons.length
  for (let i = 0; i < len; i++) {
    const button = copyButtons[i]
    const type = button.getAttribute('data-type')
    if (type === 'heading') {
      button.setAttribute('data-tooltip', textNotCopiedUrl)
    } else if (type === 'code') {
      button.innerText = textNotCopiedCode
    }
  }
}

// ======================================================================= Hooks
onMounted(async () => {
  await nextTick(() => {
    initializeCopyButtons()
  })
})

</script>
