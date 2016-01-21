const flattenBitmap = (bitmap, colorPalette) => {
  return bitmap.reduce((flat, yLine, y) => {
    return flat.concat(yLine.map((color, x) => {
      return {x, y, color: color}
    }))
  }, [])
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
