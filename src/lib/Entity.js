import { Record } from "immutable"

export class Size extends Record({width:0, height:0}){}

class Point extends Record({x:0, y:0}){}

class CursorPoint extends Point{}

class PixelPoint extends Point{}

class Rect extends Record({x:0, y:0, w: 0, h: 0}) {
  render(context, color){
    let {x, y, w, h} = this
    context.fillStyle = color
    context.fillRect(x, y, w, h)
  }
}

class Color extends Record({r:0, g:0, b:0, a:0}){
}

export class Pixel {
  constructor(point, color){
    this.point = new PixelPoint(point)
    this.color = new Color(color)
  }
  toColorString(){
    let c = this.color
    return `rgba(${c.r}, ${c.g}, ${c.b}, ${(c.a/255)})`
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
        let rect = this.pixelToRect(pix)
        context.fillStyle = color
        context.fillRect(rect.x, rect.y, rect.w, rect.h)
      })
    }
  }
  cursorToPixel(cx, cy){
    return new PixelPoint({      
      x: Math.floor(cx / this.size),
      y: Math.floor(cy / this.size)
    })
  }
}
