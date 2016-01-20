const flattenBitmap = (bitmap, colorPalette) => {
  return bitmap.reduce((flat, yLine, y) => {
    return flat.concat(yLine.map((color, x) => {
      return {x, y, color: color}
    }))
  }, [])
}

class PixelGrid{
  constructor(size){
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
}

export const mapToRects = (bitmap, size = 4) => {
  let pg = new PixelGrid(size)
  let pixels = flattenBitmap(bitmap)
  return pixels.map( (pix) => {
    let grid = pg.pointToBox(pix.x, pix.y)
    grid.color = pix.color
    return grid
  })
}
