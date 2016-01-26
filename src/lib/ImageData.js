import range from "lodash.range"
import { matrix } from "./mapIterator"
import { Pixel, Color } from "./Entity"
import Matrix from "./Matrix"

class ImageData {
  constructor(width, data){
    this.data = data
    this.width = width
  }
  get range(){
    return 4;
  }
  getIndex(x, y){
    return (x + y * this.width) * this.range
  }
  get(x, y){
    let index = this.getIndex(x, y)
    let end = index + this.range
    let chunk = this.data.slice(index, end)
    return this.toColor(chunk)
  }
  toColor(chunk){
    return {
      r: chunk[0],
      g: chunk[1],
      b: chunk[2],
      a: chunk[3],
    }
  }
}

const toPix = (data, x, y) => {
  return 
}

const toMap = (data, width, height) => {
  let pix = new Matrix(width, height)
  let imageData = new ImageData(width, data)
  for(let p of matrix(width, height)){
    let px = new Pixel(p, imageData.get(p.x, p.y))
    pix.set(p.x, p.y, px)
  }
  return pix
}

export const contextToMap = (context, width, height) => {
  let imageData = context.getImageData(0, 0, width, height)
  return toMap(imageData.data, width, height)
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
