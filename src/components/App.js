import React, {Component} from "react"
import ReactDOM from "react-dom"
import { Provider, connect } from "react-redux"
import { DrawCanvas } from "./Canvas"
import { createStore } from "redux"
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
    return <DrawCanvas { ...this.props }/>
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

