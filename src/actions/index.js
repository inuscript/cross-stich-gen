import { createAction } from 'redux-actions'
import { contextToMap } from "../lib/imageData"
export const paint = createAction('PAINT', (x, y, color) => {
  return {x, y, color}
})


const reloadMap = createAction('RELOAD_MAP', (data) => data)
const reloadPalette = createAction('RELOAD_PALETTE', (data) => data)

export function loadImage(imageData, width, height){
  return function(dispatch){
    let map = contextToMap(imageData, width, height)
    // let pixel = imageToRGBA(imageData)
    dispatch(reloadMap(map))
    // dispatch(reloadMap(pixel.map))
  }
}