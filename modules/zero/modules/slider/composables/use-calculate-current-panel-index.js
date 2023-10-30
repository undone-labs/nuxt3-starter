// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useCalculateCurrentPanelIndex = (display) => {
  if(display % 2 === 0) {
    // if displaying an even number of panels, currentPanel is
    // index 1 in in panelPositions
    return 1
  } else {
    /**
     * if displaying an odd number of panels, currentPanel is the index
     * of the middle visible panel in panelPositions
     *
     * the number of hidden panels on the left is equal to the number of visible
     * panels on either side of currentPanel
     */
    return display - 1
  }
}
