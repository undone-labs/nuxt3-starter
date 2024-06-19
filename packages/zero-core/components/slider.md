## Documentation for the Slider component

A simple slider that uses named slots to pass in externally styled content and controls to slides/the slider.

The slider operates in one of two modes: `slider` or `marquee` which is passed as the value for the `mode` prop. Both modes make use of the `slides` prop which should be an array of slides that will appear in either the slider or marquee.

### Slider mode

In slider mode, pass a single template slide into the slot named `slide`. This template is duplicated behind the scenes by Nuxt to create a slide for each element in the `slides` array passed as a prop to the slider. A single slot prop, `index` is returned to the slot so that the content of the slide template can use this index to look up it's respective slide content from the slides array.

A second named slot called `controls` is available where buttons can be added to control the movement of slides. There is a single returned slot prop which is a function called `increment()`. Connect this function to the control button click handlers. Calling `increment()` with an argument of `-1`  will rotate all slides back to the left and supplying a value of `1` will rotate all slides forward to the right.

### Marquee mode

In marquee mode, the controls slot has no use and can simply be omitted. The marquee is more straightforward and will simply rotate through the array of slides provided using the template passed to the `slide` slot to render each slide. The direction of the marquee rotation can be set by supplying the slider with a `marquee-direction` prop set to either `left` or `right`.

### Common props

Both modes share a `display` prop, which sets how many slides are in view at once and a `period` prop which determines how long, in milliseconds, it takes for a slide to occupy the position of its next neighbour. In marquee mode, this value is multiplied by the number of slides present. Adjusting the period adjusts the speed of both the slider and marquee.

### Example

For an example of use, run the `site` package and navigate to the `/slider` route.

