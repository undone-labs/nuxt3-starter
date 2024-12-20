# Zero Markdown Parser


This component parses an input string returning HTML markup according to conventional markdown text-to-HTML conversion syntax. Uses [unified](https://github.com/unifiedjs/unified) in tandem with several [remark](https://github.com/remarkjs/remark) and [rehype](https://github.com/rehypejs/rehype/tree/main) plugins to transform the input string.

After the input text has been processed and rendered using the component template, its inner HTML is parsed for heading nodes as well as buttons with the `.copy-button` class. Links are attached to heading nodes that append their heading hash to the URL allowing for easy navigation to a specific section in a page. Event listeners are attached to copy buttons which copy either these heading links or the text in the next sibling node; for example, the contents of a code block.

## Props

| Prop | type | description | values |
| ---- | ---- | ----------- | ------ |
| `markdown` | string | The input markdown string to process. |  |
| `disableHeadingLinks`<span>(optional)</span> | boolean | A boolean indicating whether or not links should be attached to heading nodes. |  |

## Emitters


 - **foundHeadingNodes** - Emits all HTML heading nodes parsed from the processed markdown output.

## Methods

#### initializeCopyButtons()


Parses processed HTML output for elements with a class of either `.markdown` or `.copy-button`. A 'click' event listener is attached to each element that, depending on the type of node, either copies a URL + hash in the case of a heading or the next sibling's text content if otherwise. In both cases, text is copied to the clipboard using [zeroAddTextToClipboard](/zero-core/composables/zero-add-text-to-clipboard). As part of the click handler attached to each button, a 'copied' state is added to its inner HTML with a feedback message indicating to the user if the text in question has been copied to the clipboard. Immediately before this, the [clearCopiedState](/zero-core/modules/markdown-parser/components#clearcopiedstate) method is called to reset all button 'copied' states.

#### clearCopiedStates()


Loops through all copy buttons parsed from [initializeCopyButtons](/zero-core/modules/markdown-parser/components#initializecopybuttons) and resets 'copied' states.

#### collectAndEmitHeadingNodes()


Finds all heading nodes (`h1`, `h2`, `h3`, etc.) in the processed markdown output and emits them using the [foundHeadingNodes](/zero-core/modules/markdown-parser/components/zero-markdown-parser#emitters) emitter.
