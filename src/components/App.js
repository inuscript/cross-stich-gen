import React, {Component} from "react"
import ReactDOM from "react-dom"
import { Provider, connect } from "react-redux"
import { PixelCanvas } from "./Canvas"
import { ImageUploader } from "./ImageUploader"
import { createStore, bindActionCreators } from "redux"
import * as actions from "../actions"
import crossStich from "../reducer"

let store = createStore(crossStich,{
  bitmap : [
    [0,0,1], 
    [0,1,0], 
    [1,0,0]
  ],
  palette : ['#fff', '#f00'],
  pixelSize: 10
})

let select = (state) => {
  return {
    bitmap: state.bitmap,
    palette: state.palette,
    pixelSize: state.pixelSize,
  }
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

let Connected = connect(select, dispatchToProps)(App)

export class CrossStichApp extends Component{
  render(){
    return (
      <Provider store={store}>
        <Connected />
      </Provider>
    )
  }
}

