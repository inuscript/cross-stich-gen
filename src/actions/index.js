import { createAction } from 'redux-actions'
// import ImageData from "../lib/ImageData"
import Bitmap from "../lib/Bitmap"

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
    let b = Bitmap.generate(imageData)
    dispatch(reloadMap(b))
  }
}