import { createStore } from 'redux'
import { combineReducers } from 'redux'
import { ReduceStore } from "flux/utils"


const bitmap = (state = [], action) => {
  switch(action.type){
    case 'PAINT':
      let {x, y, color} = action.payload
      let cloned = state.concat()
      cloned[y][x] = color
      return cloned 
    case 'RELOAD':
      return action.payload
    default:
      return state
  }
}

const palette = (state = [], action) => {
  switch(action.type){
    case 'ADD_PALETTE':
      return [].concat(state).concat(action.payload)
    case 'RELOAD':
      return action.payload
    default:
      return state
  }
}

const pixelSize = (state = 10, action) => {
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

export class BitmapStore extends ReduceStore{
  reduce(state, action){
    return bitmap(state, action)
  }
}
