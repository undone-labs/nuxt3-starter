// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useCalculateCurrentPanel = (display, panelPositions) => {
  let currentPanelIndex
  if(display % 2 === 0) {
    // if displaying an even number of panels, currentPanel is
    // index 1 in in panelPositions
    currentPanelIndex = 1
  } else {
    // if displaying an odd number of panels, currentPanel is the index
    // of the middle visible panel in panelPositions
    currentPanelIndex = Math.ceil(display / 2)
  }
  return panelPositions[currentPanelIndex]
}
