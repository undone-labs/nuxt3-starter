// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineStore } from 'pinia'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useZeroSliderStore = defineStore('zero-slider', () => {
  // ===================================================================== state
  const sliders = ref([])

  // =================================================================== actions
  /**
   * @method setSlider
   */
  const setSlider = (slider) => {
    const index = sliders.value.findIndex(obj => obj.id.includes(slider.id.value) )
    if (index === -1) {
      sliders.value.push(slider)
    } else {
      sliders.value.splice(index, 1, slider)
    }
  }

  /**
   * @method removeSlider
   */
  const removeSlider = (id) => {
    const index = sliders.value.findIndex(obj => obj.id.includes(id))
    delete sliders.value[index]
  }

  /**
   * @method updateSlider
   */
  const updateSlider = (incoming) => {
    const id = incoming.sliderId
    const slider = sliders.value.find(obj => obj.id.includes(id.value)) // probably going to be a deep clone problem
    Object.assign(slider, incoming)
    const index = sliders.value.findIndex(obj => obj.id.includes(id.value))

    sliders.splice(index, 1, incoming.slider)
  }

  /**
   * @method getSliderPanelCount
   */
  const getSliderPanelCount = (id) => {
    const index = sliders.value.findIndex(obj => obj.id.includes(id.value))
    return sliders.value[index].panelCount
  }

  /**
   * @method getSliderCurrentPanel
   */
  const getSliderCurrentPanel = (id) => {
    const index = sliders.value.findIndex(obj => obj.id.includes(id.value) )
    return sliders.value[index].currentPanel
  }

  // ==================================================================== return
  return {
    // ----- state
    sliders,
    // ----- actions
    setSlider,
    removeSlider,
    updateSlider,
    getSliderPanelCount,
    getSliderCurrentPanel
  }
})
