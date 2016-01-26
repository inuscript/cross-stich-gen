import { createStore } from 'redux'
import { combineReducers } from 'redux'

const find = (bitmap, x, y) => {
  bitmap.forEach((item, i) => {
    if(item.point.x === x && item.point.y === y){
      return 
    }
  })
}

export const bitmap = (state = null, action) => {
  switch(action.type){
    case 'PAINT':
      let {x, y, color} = action.payload
      state.set(x, y, color)
      return state.clone() 
    case 'RELOAD_MAP':
      return action.payload
    default:
      return state
  }
}

export const palette = (state = [], action) => {
  switch(action.type){
    case 'ADD_PALETTE':
      return [].concat(state).concat(action.payload)
    case 'RELOAD_PALETTE':
      return action.payload
    default:
      return state
  }
}

export const pixelSize = (state = 10, action) => {
  switch(action.tyoe){
    case 'CHANGE_PIXEL_SIZE':
      return state
    default:
      return state
  }
}

export default combineReducers({
  bitmap, palette, pixelSize
})