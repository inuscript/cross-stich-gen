import { createAction } from 'redux-actions'
import range from "lodash.range"
export const paint = createAction('PAINT', (x, y, color) => {
  return {x, y, color}
})

export const loadImage = createAction('LOAD_IMAGE', (imageData) => {
  const {data, height, width} = imageData
  let item = range(0, height).map( (y) => {
    return range(0, width).map( (x) => {
      let index = (x + y * width) * 4;
      let p = {
        r: data[index + 0],
        g: data[index + 1],
        b: data[index + 2],
        a: data[index + 3]
      } 
      return p
    })
  })
})