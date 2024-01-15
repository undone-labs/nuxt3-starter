<template>

  <div
    ref="markdownRef"
    class="markdown"
    v-html="parsed" />

</template>

<script setup>
// ===================================================================== Imports
import Kramed from 'kramed'

// ======================================================================== Data
const props = defineProps({
  markdown: { // unprocessed markdown
    type: String,
    required: true
  },
  section: { // used to scope headings
    type: String,
    required: false,
    default: ''
  }
})

const renderer = new Kramed.Renderer()
const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const baseURL = `${runtimeConfig.public.siteUrl}${route.path}`
const textCopied = 'Copied!'
const textNotCopiedUrl = 'Click to copy link'
const textNotCopiedCode = 'Copy'
const zeroStore = useZeroStore()
const parsed = ref(null)
const markdownRef = ref(null)
let copyButtons = []

const emit = defineEmits(['foundHeadingNodes'])

// ============================================================== [Setup] Kramed
/**
 * @method splitOutputIntoSections
 */

 const splitOutputIntoSections = (err, parsed) => {
  if (err) { console.log('error during parsing: ', err) }
  const content = parsed.split(/(<h\d{1})/g)
  const sectionIndexes = []
  content.forEach((element, index) => {
    if (element.startsWith('<h')) {
      sectionIndexes.splice(0, 0, index)
    }
  })
  const sectionedOutput = [...content]
  sectionIndexes.forEach((element, index) => {
    if (index === 0) {
      sectionedOutput.push('</section>')
    }
    sectionedOutput.splice(element, 0, '<section>')
    if (index !== (sectionIndexes.length -1)) {
      sectionedOutput.splice(element, 0, '</section>')
    }
  })
  return sectionedOutput.join('')
}

/**
 * @note link | a
 */

renderer.paragraph = function(paragraph) {
  if (paragraph.startsWith(':::tip') && paragraph.endsWith(':::')) {
    const headingEndIndex = paragraph.search(/\n/)
    const tipBlockHeading = paragraph.slice(6,headingEndIndex )
    const tipBlockText = paragraph.slice(headingEndIndex, (paragraph.length - 3))
    console.log('tipblocktext ', )
    return `
      <div class="tip-block">
        <div class="heading">${tipBlockHeading}</div>
        <p class="text">${tipBlockText}</p>
      </div>
    `
  }
  return `<p>${paragraph}</p>`
}

renderer.link = function (href, title, text) {
  const split = text.split('||')
  const len = split.length
  let attributeString = ''
  if (len > 1) {
    try {
      const attributes = JSON.parse(split[1].replace(/&quot;/g, '"'))
      if (typeof attributes === 'object') {
        Object.keys(attributes).forEach((key) => {
          attributeString += `${key}="${attributes[key]}" `
        })
      }
    } catch (e) {
      return `<a href="${href}">${split[0]}</a>`
    }
  }
  return `<a href="${href}" ${attributeString}>${split[0]}</a>`
}

/**
 * @note heading | h1, h2, h3, h4, h5, h6
 */

renderer.heading = function (text, level) {
  const escapedText = text.toLowerCase()
    .replace(/[^\w]+/g, '-')
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
  return `
    <h${level}
      id="${escapedText}"
      section="${props.section}"
      class="heading-anchor">
      <button
        class="copy-button"
        data-hash="${escapedText}"
        data-tooltip="Click to copy link"
        data-tooltip-theme="light"
        data-type="heading">#</button>
      ${text}
    </h${level}>
  `
}

/**
 * @note code
 */

renderer.code = function (code, language) {
  const highlighted = zeroHighlightCode(code, language)
  return `
    <div class="code-wrapper" ${highlighted.language ? `data-language="${highlighted.language}"` : false}>
      <button class="copy-button" data-type="code">
        Copy
      </button>
      <pre><code class="code-block">${highlighted.code}</code></pre>
    </div>
  `
}

parsed.value = Kramed(props.markdown, { renderer }, splitOutputIntoSections)

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
    const text = type === 'heading' ? `${baseURL}#${hash}` : button.nextElementSibling.textContent
    button.addEventListener('click', () => {
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

/**
 * @method collectAndEmitHeadingNodes
 */

const collectAndEmitHeadingNodes = () => {
  const nodes = Array.from(markdownRef.value.querySelectorAll('*[id]'))
  emit('foundHeadingNodes', nodes)
}

// ======================================================================= Watch
watch(
  () => props.markdown,
  incoming => {
    parsed.value = Kramed(incoming, { renderer }, splitOutputIntoSections)
  }
)

// ======================================================================= Hooks
onMounted(async () => {
  await nextTick(() => {
    initializeCopyButtons()
    collectAndEmitHeadingNodes()
  })
})
</script>
