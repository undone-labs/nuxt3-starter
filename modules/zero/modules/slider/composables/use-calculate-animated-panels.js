// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useCalculateAnimatedPanels = (targetPanel, panelPositions, display) => {
  const targetPanelIndex = panelPositions.indexOf(targetPanel)
  const currentPanelIndex = useCalculateCurrentPanelIndex(display)
  const extraPanelCount = Math.max(Math.floor(display / 2), 1)
  const indexDifference = Math.abs(currentPanelIndex - targetPanelIndex)
  if (targetPanelIndex < currentPanelIndex) {
    return [...panelPositions].slice(extraPanelCount - indexDifference, display + extraPanelCount)
  }
  if (targetPanelIndex > currentPanelIndex) {
    return [...panelPositions].slice(extraPanelCount, display + indexDifference + extraPanelCount)
  }
}
