# Tabbed Slider


A slider component that is navigable through tabs corresponding to each slide.

## Props

| Prop | type | description | values |
| ---- | ---- | ----------- | ------ |
| `id`<span>(optional)</span> | string | Unique slider ID that can be targetted with global $bus events |  |
| `slides` | object | An object whose keys are unique slide ID strings and corresponding values are slide objects containing data pertaining to its respective slide. |  |
| `defaultSlideIndex`<span>(optional)</span> | number | Explicitly set the default slide by index. Defaults to 0, the first slide. |  |
| `animateHeight`<span>(optional)</span> | boolean | Whether or not the slider should animate height as slides with differing heights slide into view. |  |
| `fixedHeight`<span>(optional)</span> | boolean | A fixed-height slider's slides are set to `height: 100%`. Usually to allow for scrolling within a slide. |  |

## Computed properties

#### slugs()


An array of unique slugs corresponding to each slide. Generated from the keys of the slides prop object.


 - **returns:** `[string]`  

#### count()


Returns the number of slides.


 - **returns:** `number`  

#### currentSlideIndex()


Returns the index of the currently selected slide.


 - **returns:** `number`  

#### currentSlide()


Returns an object containing the slug/id of the newly selected slide and its data at the moment the slide is selected.


 - **returns:** `{ slug: string, data: Object }`  

## Slots

#### Before Track


**name:** `before-track`  **scoped:** `true`


Can be used to add control elements before the slides.

| binding | type | description |
| ------- | ---- | ----------- |
| `change-slide` | `func` | Binds the [changeSlide](/zero-core/components/tabbed-slider#changeslide) method. |
| `current-slide` | `func` | Binds the [currentSlide](/zero-core/components/tabbed-slider#currentslide) computed property. |

#### Key


**name:** `key`  **scoped:** `true`


Content to inject into each slide. Should be generated from an array of slides.

| binding | type | description |
| ------- | ---- | ----------- |
| `name` | `string` | The name of each indiviudal slide slot. Keys from the slides prop will be used for these values. |
| `data` | `Object` | The slide data object of each slide. |
| `change-slide` | `func` | Binds the [changeSlide](/zero-core/components/tabbed-slider#changeslide) method. |
| `active` | `boolean` | Whether or not this slide is currently selected. |

#### After Track


**name:** `after-track`  **scoped:** `true`


Can be used to add control elements after the slides.

| binding | type | description |
| ------- | ---- | ----------- |
| `change-slide` | `func` | Binds the [changeSlide](/zero-core/components/tabbed-slider#changeslide) method. |
| `current-slide` | `func` | Binds the [currentSlide](/zero-core/components/tabbed-slider#currentslide) computed property. |

## Emitters


 - **slideChanged** - returns: `{ slug: string, data: Object }` - Emits the new value returned by [currentSlide](/zero-core/components/tabbed-slider#currentslide) right after the slide is changed.

## Methods

#### setPanelHeight()


Sets the new height of the slider track if the `animateHeight` prop is enabled.

#### changeSlide()


Changes the current slide.

| param | type | description |
| ----- | ---- | ----------- |
| `slug` | string | The slug of the slide to switch to. |

#### handleChangeSlideBusEvent()


Calls the [changeSlide](/zero-core/components/tabbed-slider#changeslide) method when the `ZeroTabbedSlider__changeSlide` bus event is fired via [$bus](/zero-core/plugins#bus).

| param | type | description |
| ----- | ---- | ----------- |
| `payload` | Object | Slide data. |
| `payload.id` | string | The ID of the slider. Must match the `id` prop of this component. |
| `payload.slug` | string | The slug/id of the slide to set to active. Must be one of the keys in the `slides` prop. |

#### handleResetHeightBusEvent()


Calls the [setPanelHeight](/zero-core/components/tabbed-slider#setpanelheight) method when the `ZeroTabbedSlider__resetHeight` bus event is fired via [$bus](/zero-core/plugins#bus).

| param | type | description |
| ----- | ---- | ----------- |
| `id` | string | The ID of the slider. Must match the `id` prop of this component. |
