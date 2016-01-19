import { createAction } from 'redux-actions'
import range from "lodash.range"
import uniq from "lodash.uniq"

export const paint = createAction('PAINT', (x, y, color) => {
  return {x, y, color}
})

const imageToPixels = (data) => {
  if(data.length % 4 !== 0){
    throw new Error("Invalid Data")
  }
  let pixelRange = range(0, data.length / 4)
  return pixelRange.map((i) => {
    let p = {
      r: data[4 * i + 0],
      g: data[4 * i + 1],
      b: data[4 * i + 2],
      a: data[4 * i + 3],
    }
    return `rgba(${p.r}, ${p.g}, ${p.b}, ${p.a})`
  })
}

const imageToRGBA = (imageData) => {
  const {data, height, width} = imageData
  let pixels = imageToPixels(data)
  let palette = uniq(pixels)

  let map = range(0, height).map( (y) => {
    return range(0, width).map( (x) => {
      let i = (x + y * width)
      let p = palette.indexOf(pixels[i])
      return p
    })
  })
  return { map, palette }
}

const reloadMap = createAction('RELOAD_MAP', (data) => data)
const reloadPalette = createAction('RELOAD_PALETTE', (data) => data)

export function loadImage(imageData){
  return function(dispatch){
    let pixel = imageToRGBA(imageData)
    dispatch(reloadPalette(pixel.palette))
    dispatch(reloadMap(pixel.map))
  }
}