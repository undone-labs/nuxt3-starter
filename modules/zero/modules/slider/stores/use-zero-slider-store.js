// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineStore } from 'pinia'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useZeroSliderStore = defineStore('zero-slider', () => {
  // ===================================================================== state
  const sliders = ref({})
  /**
   * Expected slider structure:
   * {
   *   id: String - '{sliderId} | {uuid}',
   *   sliderId: String
   *   currentPanel: Number - index of the current panel in the array of panels, see use-calculate-current-panel composable for details
   *   panelCount: Number
   *   panelPositions: [] - index of panels in the DOM, first visible panel is at index 1
   *   animatedPanels: [] - panelPosition indexes of animating panels
   *   display: Number - number of panels displayed
   * }
   */

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
    console.log('updating slider ', updateSlider)
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
