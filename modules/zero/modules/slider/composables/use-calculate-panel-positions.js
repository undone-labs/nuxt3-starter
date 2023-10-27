// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useCalculatePanelPositions = (targetPanel, panelPositions, display) => {
  const currentPanelIndex = useCalculateCurrentPanelIndex(display)
  const targetPanelIndex = panelPositions.indexOf(targetPanel)
  let updatedPanelPositions = [...panelPositions]
  if (targetPanelIndex < currentPanelIndex) {
    do {
      updatedPanelPositions.unshift(updatedPanelPositions.pop())
    } while (updatedPanelPositions.indexOf(targetPanel) !== currentPanelIndex )
  }
  if (targetPanelIndex > currentPanelIndex) {
    do {
      updatedPanelPositions.push(updatedPanelPositions.shift())
    } while (updatedPanelPositions.indexOf(targetPanel) !== currentPanelIndex)
  }
  return updatedPanelPositions
}
