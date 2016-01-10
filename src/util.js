export const flattenBitmap = (bitmap, colorPalette) => {
  return bitmap.reduce((flat, yLine, y) => {
    return flat.concat(yLine.map((bit, x) => {
      // TODO: default color
      return {x, y, color: colorPalette[bit] || "#fff"}
    }))
  }, [])
}
