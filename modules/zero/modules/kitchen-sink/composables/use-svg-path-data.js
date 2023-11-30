// ////////////////////////////////////////////////////////////////////// Import
// -----------------------------------------------------------------------------
import { parseSVG } from 'svg-path-parser'

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export const useSvgPathData = (path) => {
  const commands = parseSVG(path)
  
  const xValues = commands.map(el => {
    const coords = []
    Object.keys(el).forEach((key) => {
      if (key.charAt(0) === 'x') { coords.push(el[key]) }
    })
    return coords
  }).flat()
  
  const yValues = commands.map(el => {
    const coords = []
    Object.keys(el).forEach((key) => {
      if (key.charAt(0) === 'y') { coords.push(el[key]) }
    })
    return coords
  }).flat()
  
  const bounds = {
    minX: Math.min(...xValues),
    maxX: Math.max(...xValues),
    minY: Math.min(...yValues),
    maxY: Math.max(...yValues)
  }
  
  const rangeX = Math.abs(bounds.maxX - bounds.minX)
  const rangeY = Math.abs(bounds.maxY - bounds.minY)
  
  return {
    rangeX,
    rangeY,
    commands,
    path
  }
}