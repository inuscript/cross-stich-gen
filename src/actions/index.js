import { createAction } from 'redux-actions'
import range from "lodash.range"
import uniq from "lodash.uniq"

export const paint = createAction('PAINT', (x, y, color) => {
  return {x, y, color}
})


const reloadMap = createAction('RELOAD_MAP', (data) => data)
const reloadPalette = createAction('RELOAD_PALETTE', (data) => data)

export function loadImage(imageData){
  return function(dispatch){
    let pixel = imageToRGBA(imageData)
    dispatch(reloadPalette(pixel.palette))
    dispatch(reloadMap(pixel.map))
  }
}