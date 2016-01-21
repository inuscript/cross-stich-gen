import { Record } from "immutable"

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

// Grid cord
class Grid {
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
