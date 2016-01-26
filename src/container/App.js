import React, {Component} from "react"
import ReactDOM from "react-dom"
import { Provider, connect } from "react-redux"
import { PixelCanvas } from "../components/Canvases"
import { ImageUploader } from "../components/ImageUploader"
import { createStore, bindActionCreators } from "redux"
import * as actions from "../actions"
import { store } from "../store"
import rootSelector from "../selector/"

let selectMapper = (state) => {
  return rootSelector(state)
}

let dispatchToProps = (dispatch) => {
  let bound = bindActionCreators(actions, dispatch) 
  return bound
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

