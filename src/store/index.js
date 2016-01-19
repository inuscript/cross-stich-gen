import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "../reducer"

let initialState = {
  bitmap : [
    [0,0,1], 
    [0,1,0], 
    [1,0,0]
  ],
  palette : ['#fff', '#f00'],
  pixelSize: 10
}

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

export const store = createStore(rootReducer, initialState)
