<template>
  <article ref="markdownRef" class="markdown" v-html="parsed" />
</template>

<script setup>
/**
 * @description This component parses an input string returning HTML markup according to conventional markdown text-to-HTML conversion syntax. Uses [unified](https://github.com/unifiedjs/unified) in tandem with several [remark](https://github.com/remarkjs/remark) and [rehype](https://github.com/rehypejs/rehype/tree/main) plugins to transform the input string.
 * While processing the markdown input string, copy buttons are attached to heading, code and pre elements with [useAddCopyButton](/zero-core/modules/markdown-parser/composables#useaddcopybutton). These elements are additionally processed with [useAddCssSelectors](/zero-core/modules/markdown-parser/composables#useaddcssselectors) and [useAddDataAttributes](/zero-core/modules/markdown-parser/composables#useadddataattributes).
 * Once the output markup has been rendered using the component template, its inner HTML is parsed for all of the added copy buttons by searching for the `.copy-button` class. Event listeners are attached to copy buttons which, in the case of headings, copy the URL with the heading hash to the clipboard or, in the case of code blocks, copy the code content to the clipboard.
 */
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

// ======================================================================== Data
const props = defineProps({
  /**
   * The input markdown string to process.
   */
  markdown: {
    type: String,
    required: true
  },
  /**
   * A boolean indicating whether or not links should be attached to heading nodes.
   */
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
const markdownRef = ref(null)
let copyButtons = ref([])

const emit = defineEmits([
  /**
   * Emits all HTML heading nodes parsed from the processed markdown output.
   */
  'foundHeadingNodes'
])

// ============================================================= Setup Processor
processor.value = unified()
  .use(remarkParse)
  .use(remarkMath)
  .use(remarkSectionize)
  .use(remarkRehype)
  .use(rehypeKatex, { output: 'mathml' })
  .use(rehypeHighlight, { detect: true })
  .use(rehypeRewrite, {
    rewrite: (node, index, parent) => {
      if (node.type === 'element') {
        if (headingTagNames.includes(node.tagName)) {
          const text = node.children.find(child => child.type === 'text')?.value
          if (text) {
            const id = unref(useChangeCase(text, 'paramCase').value)
            node = useAddCssSelectors(node, id, ['heading-anchor'])
            node = useAddDataAttributes(node, { 'data-id': useId() })
            if (!props.disableHeadingLinks) {
              node = useAddCopyButton(node, id)
            }
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
 * @desc Parses processed HTML output for button elements with a class of either `.markdown` or `.copy-button`. A 'click' event listener is attached to each button that, depending on the type of node, either copies a URL + hash in the case of a heading or in the case of a code block, copies its content (found in the next sibling element relative to the button). In both cases, text is copied to the clipboard using [zeroAddTextToClipboard](/zero-core/composables/zero-add-text-to-clipboard). As part of the click handler attached to each button, a 'copied' state is added to its inner HTML with a feedback message indicating to the user if the text in question has been copied to the clipboard. Immediately before this, the [clearCopiedState](/zero-core/modules/markdown-parser/components#clearcopiedstates) method is called to reset all button 'copied' states.
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
 * @desc Loops through all copy buttons parsed from [initializeCopyButtons](/zero-core/modules/markdown-parser/components#initializecopybuttons) and resets 'copied' states.
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

/**
 * @method collectAndEmitHeadingNodes
 * @desc Finds all heading nodes (`h1`, `h2`, `h3`, etc.) in the processed markdown output and emits them using the [foundHeadingNodes](/zero-core/modules/markdown-parser/components/zero-markdown-parser#emitters) emitter.
 */

const collectAndEmitHeadingNodes = () => {
  const nodes = Array.from(markdownRef.value.querySelectorAll('h1, h2, h3, h4, h5, h6'))
  emit('foundHeadingNodes', nodes)
}

// ======================================================================= Hooks
onMounted(async () => {
  await nextTick(() => {
    initializeCopyButtons()
    collectAndEmitHeadingNodes()
  })
})
</script>
