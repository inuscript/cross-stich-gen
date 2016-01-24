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
  toGridRect(scale){
    let grid = new Grid(scale)
    let {x, y} = this.point
    return grid.pixelToRect(x, y)
  }
}
// Grid cord
export class Grid {
  constructor(size){
    this.size = size
  }
  pixelToRect(px, py){
    return new Rect({
      x: px * this.size, 
      y: py * this.size, 
      w: this.size, 
      h: this.size
    })
  }
  cursorToPixel(cx, cy){
    return new PixelPoint({      
      x: Math.floor(cx / this.size),
      y: Math.floor(cy / this.size)
    })
  }
}
