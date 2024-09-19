# Tabbed Slider


A slider component that is navigable through tabs corresponding to each slide.

## Props

| Prop | type | description | values |
| ---- | ---- | ----------- | ------ |
| `id`<span>(optional)</span> | string | Specific slider ID that can be targetted with global $bus events<ul></ul> | `small,medium,large` |
| `slides` | object | Object keys used as slide IDs<ul></ul> |  |
| `defaultSlideIndex`<span>(optional)</span> | number | Set the default slide to be anything other than the first slide<ul></ul> |  |
| `animateHeight`<span>(optional)</span> | boolean | Choose to disable height animation<ul></ul> |  |
| `fixedHeight`<span>(optional)</span> | boolean | A fixed-height slider's slides are set to `height: 100%`. Usually to allow for scrolling within a slide.<ul></ul> |  |

## Slots

#### Before Track


**name:** `before-track`  **scoped:** `true`

| binding | type | description |
| ------- | ---- | ----------- |
| `change-slide` |  |  |
| `current-slide` |  |  |

#### Key


**name:** `key`  **scoped:** `true`

| binding | type | description |
| ------- | ---- | ----------- |
| `name` |  |  |
| `data` |  |  |
| `change-slide` |  |  |
| `active` |  |  |

#### After Track


**name:** `after-track`  **scoped:** `true`

| binding | type | description |
| ------- | ---- | ----------- |
| `change-slide` |  |  |
| `current-slide` |  |  |

## Emitters


 - **slideChanged** - undefined

## Methods

#### setPanelHeight()

#### changeSlide()


Changes the current slide.

| param | type | description |
| ----- | ---- | ----------- |
| `slug` | string | The slug of the slide to switch to. |

#### handleChangeSlideBusEvent()

#### handleResetHeightBusEvent()
