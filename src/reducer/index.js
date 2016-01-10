import { createStore } from 'redux'
import { combineReducers } from 'redux'

const bitmap = (state = {}, action){
  switch(action.type){
    case 'PAINT':
      let {x, y, color} = action.payload
      return Object.assign({}, state, { 
        [x]: {
          [y]: color
        } 
      })
    default:
      return state
  }
}

const palette = (state = [], action){
  let num 
  switch(action.type){
    case 'ADD_PALETTE':
      return [].concat(state).concat(action.payload)
    default:
      return state
  }
}

export default combineReducers({
  bitmap, palette
})