import range from "lodash.range"
import { matrix } from "./mapIterator"
import { Pixel, Color } from "./Entity"
import Bitmap from "./Bitmap"

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

const toMap = (data, width, height) => {
  let pix = new Bitmap(width, height)
  let imageData = new ImageData(width, data)
  for(let p of matrix(width, height)){
    pix.set(p.x, p.y, imageData.get(p.x, p.y))
  }
  return pix
}

export const contextToMap = (context, width, height) => {
  let imageData = context.getImageData(0, 0, width, height)
  return toMap(imageData.data, width, height)
}
