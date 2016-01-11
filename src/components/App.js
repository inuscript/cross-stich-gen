import React, {Component} from "react"
import ReactDOM from "react-dom"
import { Provider, connect } from "react-redux"
import { PixelCanvas } from "./Canvas"
import { createStore, bindActionCreators } from "redux"
import * as actions from "../actions"
import crossStich from "../reducer"

let store = createStore(crossStich,{
  bitmap : [[0,0,1], [0,1,0], [1,0,0]],
  palette : ['#fff', '#f00']
})

let select = (state) => {
  return {
    bitmap: state.bitmap,
    palette: state.palette
  }
}

class App extends Component{
  render(){
    
    return <PixelCanvas 
      { ...this.props }
      { ...bindActionCreators(actions, this.props.dispatch) }
    />
  }
}

let Connected = connect(select)(App)

export class CrossStichApp extends Component{
  render(){
    return (
      <Provider store={store}>
        <Connected />
      </Provider>
    )
  }
}

