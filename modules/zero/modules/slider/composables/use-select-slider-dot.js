// ////////////////////////////////////////////////////////////////////// Import
import { storeToRefs } from 'pinia';
import { useZeroSliderStore } from '@/modules/zero/modules/slider/stores/use-zero-slider-store'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useSelectSliderDot = (sliderId, dotIndex) => {
  const sliderStore = useZeroSliderStore()
  const { sliders } = storeToRefs(sliderStore)
  const slider = sliders.value[sliderId]
  const panelPositions = slider.panelPositions
  const display = slider.display
  sliderStore.updateSlider({
    sliderId: sliderId,
    currentPanel: dotIndex,
    panelPositions: useCalculatePanelPositions(dotIndex, panelPositions, display),
    animatedPanels: useCalculateAnimatedPanels(dotIndex, panelPositions, display)
  })
}
