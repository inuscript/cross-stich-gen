import React, {Component} from "react"
import ReactDOM from "react-dom"
import { Provider, connect } from "react-redux"
import { PixelCanvas } from "./Canvas"
import { ImageUploader } from "./ImageUploader"
import { createStore, bindActionCreators } from "redux"
import * as actions from "../actions"
import crossStich from "../reducer"
let initialState = {
  bitmap : [
    [0,0,1], 
    [0,1,0], 
    [1,0,0]
  ],
  palette : ['#fff', '#f00'],
  pixelSize: 10
}
let store = createStore(crossStich, initialState)

let selectMapper = (state) => {
  return state
}

let dispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch) 
}

class App extends Component{
  render(){
    // let actions = bindActionCreators(actions, this.props.dispatch)
    return (
      <div>
        <ImageUploader { ...this.props } />
        <PixelCanvas { ...this.props } />
      </div>
    )
  }
}

let Connected = connect(selectMapper, dispatchToProps)(App)

export class CrossStichApp extends Component{
  render(){
    return (
      <Provider store={store}>
        <Connected />
      </Provider>
    )
  }
}

