import { createSelector } from 'reselect'

const bitmapSelector = state => state.bitmap

const sizeSelector = createSelector(
  bitmapSelector, (bitmap) => {
    if(!bitmap) return {width: 0, height: 0}
    return {
      width: bitmap.width,
      height: bitmap.height
    }
  }
)

const rootSelector = createSelector(
  bitmapSelector, sizeSelector,
  (bitmap, size) => {
    return { bitmap, size }
  }
)

export default rootSelector