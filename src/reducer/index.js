import { createStore } from 'redux'

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

const palette = (state = {}, action){
  switch(action.type){
    case 'ADD':
      
  }
}