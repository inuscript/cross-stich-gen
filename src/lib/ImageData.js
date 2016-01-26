import range from "lodash.range"
import { matrix } from "./mapIterator"
import { Pixel, Color } from "./Entity"
import Bitmap from "./Bitmap"

const toColorObj = (data) => {
  return {
    r: data[0],
    g: data[1],
    b: data[2],
    a: data[3],
  }
}
const toPix = (data, x, y) => {
  return new Pixel({x, y}, toColorObj(data.get(x,y)))
}

const toMap = (data, width, height) => {
  let pix = []
  let bitmap = new Bitmap(width, data, 4)
  for(let p of matrix(width, height)){
    pix.push(toPix(bitmap, p.x, p.y))
  }
  return pix
}

export const contextToMap = (context, width, height) => {
  let imageData = context.getImageData(0, 0, width, height)
  let map = toMap(imageData.data, width, height)
  return map
}











// imageData -> { rgba}
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
