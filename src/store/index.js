import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "../reducer"

let initialState = {
  bitmap : null,
  // palette : ['#fff', '#f00'],
  pixelSize: 10
}

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

export const store = createStoreWithMiddleware(rootReducer, initialState)
