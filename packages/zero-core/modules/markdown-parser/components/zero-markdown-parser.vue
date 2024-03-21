<template>
  <div class="markdown" v-html="parsed" />
</template>

<script setup>
// ===================================================================== Imports
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMath from 'remark-math'
import remarkSectionize from 'remark-sectionize'
import remarkRehype from 'remark-rehype'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import rehypeRewrite from 'rehype-rewrite'
import rehypeStringify from 'rehype-stringify'

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
  }
})

const parsed = ref(null)
const processor = ref(null)
const headingTagNames = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const baseURL = `${runtimeConfig.public.siteUrl}${route.path}`
const textCopied = 'Copied!'
const textNotCopiedUrl = 'Click to copy link'
const textNotCopiedCode = 'Copy'
const zeroStore = useZeroStore()
let copyButtons = ref([])


// ============================================================= Setup Processor
processor.value = unified()
  .use(remarkParse)
  .use(remarkMath)
  .use(remarkSectionize)
  .use(remarkRehype)
  .use(rehypeKatex, { output: 'mathml' })
  .use(rehypeHighlight)
  .use(rehypeRewrite, {
    rewrite: (node, index, parent) => {
      if (node.type === 'element') {
        if (headingTagNames.includes(node.tagName)) {
          const id = unref(useChangeCase([...node.children].find(child => child.type === 'text').value, 'paramCase'))
          node = useAddCssSelectors(node, id, ['heading-anchor'])
          node = useAddDataAttributes(node, { 'data-id': useId() })
          if (!props.disableHeadingLinks) {
            node = useAddCopyButton(node, id)
          }
        }
        if (node.tagName === 'pre') {
          node = useAddCssSelectors(node, false, ['code-wrapper'])
          node = useAddCopyButton(node)
        }
        if (node.tagName === 'code' && parent.tagName === 'pre') {
          node = useAddCssSelectors(node, false, ['code-block'])
          const language = [...node.properties.className].find(str => str.startsWith('language-'))
          if (language) {
            parent = useAddDataAttributes(parent, { 'data-language': language.replace('language-', '') })
          }
        }
      }
    }
  })
  .use(rehypeStringify)

// ============================================================ Process Markdown
processor.value.process(props.markdown, (err, file) => {
  if (err) { console.log('error during parsing ', err) }
  if (file.value) { parsed.value = file.value }
})

// ===================================================================== Methods
/**
 * @method initializeCopyButtons
 */

 const initializeCopyButtons = () => {
  copyButtons.value = document.querySelectorAll('.markdown .copy-button')

  const len = copyButtons.value.length
  for (let i = 0; i < len; i++) {
    const button = copyButtons.value[i]
    const hash = button.getAttribute('data-hash')
    const type = button.getAttribute('data-type')
    button.addEventListener('click', () => {
      const text = type === 'heading' ? `${baseURL}#${hash}` : button.nextElementSibling.textContent
      zeroAddTextToClipboard(text)
      zeroStore.setClipboard(text)
      clearCopiedStates()
      type === 'heading'
        ? button.setAttribute('data-tooltip', textCopied)
        : button.innerText = textCopied
    })
  }
}

/**
 * @method clearCopiedStates
 */

 const clearCopiedStates = () => {
  const len = copyButtons.value.length
  for (let i = 0; i < len; i++) {
    const button = copyButtons.value[i]
    button.getAttribute('data-type') === 'heading'
      ? button.setAttribute('data-tooltip', textNotCopiedUrl)
      : button.innerText = textNotCopiedCode
  }
}

// ======================================================================= Hooks
onMounted(async () => {
  await nextTick(() => {
    initializeCopyButtons()
  })
})

</script>
