## tabbed-slider


A Slider component that is navigable through tabs corresponding to each slide.

### Props

| Prop | type | description | values |
| ---- | ---- | ----------- | ------ |
| `id`<span>(optional)</span> | string | Specific slider ID that can be targetted with global $bus events | `small,medium,large` |
| `slides` | object | Object keys used as slide IDs |  |
| `defaultSlideIndex`<span>(optional)</span> | number | Set the default slide to be anything other than the first slide |  |
| `animateHeight`<span>(optional)</span> | boolean | Choose to disable height animation |  |
| `fixedHeight`<span>(optional)</span> | boolean | A fixed-height slider's slides are set to `height: 100%`. Usually to allow for scrolling within a slide. |  |

### Emitters


 - slideChanged - undefined

### Slots


