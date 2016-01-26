import { Record } from "immutable"
import Point from "./Point"

export class Size extends Record({width:0, height:0}){}


class Rect extends Record({x:0, y:0, w: 0, h: 0}) {
  static generate(x, y, size){
    return new Rect({
      x: x * size, 
      y: y * size, 
      w: size, 
      h: size
    })
  }
  render(context, color){
    let {x, y, w, h} = this
    context.fillStyle = color
    context.fillRect(x, y, w, h)
  }
}

// Grid cord
export class Grid {
  constructor(size){
    this.size = size
  }
  pixelToRect(pixel){ // Pixel
    let {x, y} = pixel.point
    return new Rect({
      x: x * this.size, 
      y: y * this.size, 
      w: this.size, 
      h: this.size
    })
  }
  generateRenderFunction(bitmap){
    return (context) => {
      if(bitmap === null){
        return
      }
      bitmap.toArray().forEach( (pix) => {
        let color = pix.toColorString()
        let {x, y} = pix.point
        let rect = Rect.generate(x, y, this.size) // this.pixelToRect(pix)
        rect.render(context, color)
      })
    }
  }
  cursorToPixel(cx, cy){
    return new Point({      
      x: Math.floor(cx / this.size),
      y: Math.floor(cy / this.size)
    })
  }
}
