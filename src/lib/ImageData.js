import range from "lodash.range"
import { matrix } from "./mapIterator"
import { Pixel, Color } from "./Entity"
import Bitmap from "./Bitmap"

export default class ImageData {
  constructor(data, width, height){
    this.data = data
    this.width = width
    this.height = height
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
  toBitmap(){
    let {width, height} = this
    let pix = new Bitmap(width, height)
    for(let p of matrix(width, height)){
      pix.set(p.x, p.y, this.get(p.x, p.y))
    }
    return pix
  }
  static generate(imageData){
    let {data, width, height} = imageData
    return new ImageData(data, width, height)
  }
  static generateFromContext(context, width, height){
    let imageData = context.getImageData(0, 0, width, height)
    return ImageData.generate(imageData)
  }
}
