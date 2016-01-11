export class PixelBox {
  constructor(size = 4){
    this.size = size
  }
  pointToBox(x, y){ // pointToRect
    return {
      x: x * this.size, 
      y: y * this.size, 
      w: this.size, 
      h: this.size
    }
  }
  cursorToPoint(gx, gy){
    return {
      x: Math.floor(gx / this.size),
      y: Math.floor(gy / this.size)
    }
  }
  cursorToBox(gx, gy){ // cursorToRect
    let point = this.cursorToPoint(gx, gy)
    return this.pointToBox(point.x, point.y)
  }
}