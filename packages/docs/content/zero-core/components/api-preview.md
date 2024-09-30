# Api Preview


A slider component that displays API example requests and responses with highlighted code syntax using [zeroHighlightCode](/zero-core/composables/highlight-code). The component will render a list of individual sliders from the sliders prop array. Before the component is mounted, a unique sliderId is generated for each slider and inserted into each slide to associate it with the correct slider.

## Props

| Prop | type | description | values |
| ---- | ---- | ----------- | ------ |
| `sliders` | array | An array of slider objects. Each object should have a nested `metadata` object and a nested `slides` array. Each value in the `metadata` object will be displayed above its slider in a heading section. The slides array should consist of objects with the following structure:<ul><li>`id` - **type:** `string` - A unique ID for the slide in the scope of its own slider.</li><li>`tab` - **type:** `string` - A label for the slide tab selector button.</li><li>`content` - **type:** `string` - The code example string.</li><li>`language` - **type:** `string` - The language the code is written in.</li></ul> |  |

## Methods

#### setActiveSlide()


Sets the active slide of the slider in question. This method is called when a slider tab is clicked. It uses the internally generated sliderId in each slide object to know which slider to alter.

| param | type | description |
| ----- | ---- | ----------- |
| `slide` | object | The slide object of the slide to make active. |

#### copyText()


Copies the slide content to the clipboard state in the [Zero Store](/zero-core/use-zero-store#setclipboard).

| param | type | description |
| ----- | ---- | ----------- |
| `id` | string | The ID of the slide being copied. |
| `text` | string | The text to copy to the clipboard. |
