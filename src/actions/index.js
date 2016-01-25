import { createAction } from 'redux-actions'
import { contextToMap } from "../lib/imageData"

const paintAction = createAction('PAINT', (x, y, color) => {
  return {x, y, color}
})

export function paint(x, y, color){
  return function(dispatch){
    dispatch(paintAction(x, y, color))
  }
}

const reloadMap = createAction('RELOAD_MAP', (data) => data)

export function loadImage(imageData){
  return function(dispatch){
    let {width, height} = imageData.canvas
    let map = contextToMap(imageData, width, height)
    // let pixel = imageToRGBA(imageData)
    dispatch(reloadMap(map))
    // dispatch(reloadMap(pixel.map))
  }
}