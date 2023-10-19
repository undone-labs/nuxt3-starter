// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineStore } from 'pinia'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useZeroSliderStore = defineStore('zero-slider', () => {
  // ===================================================================== state
  const sliders = ref({})

  // =================================================================== actions
  /**
   * @method setSlider
   */
  const setSlider = (slider) => {
    const sliderId = slider.sliderId
    sliders.value[sliderId] = {...slider}
  }

  /**
   * @method removeSlider
   */
  const removeSlider = (id) => {
    delete sliders.value[id]
  }

  /**
   * @method updateSlider
   */
  const updateSlider = (updatedSlider) => {
    const sliderId = updatedSlider.sliderId
    sliders.value[sliderId] = {...sliders.value[sliderId], ...updatedSlider}
  }

  // ==================================================================== return
  return {
    // ----- state
    sliders,
    // ----- actions
    setSlider,
    removeSlider,
    updateSlider
  }
})
