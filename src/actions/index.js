import { createAction } from 'redux-actions'

export const paint = createAction('PAINT', (x, y, color) => {
  return {x, y, color}
})