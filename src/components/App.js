import React, {Component} from "react"
import ReactDOM from "react-dom"
import Provider from "react-redux"
import { DrawCanvas } from "./Canvas"
import { createStore } from "redux"
import crossStich from "../reducer"
let store = createStore(crossStich)

export class CrossStichApp extends Component{
  render(){
    return (
      <Provider store={store}>
        <DrawCanvas />
      </Provider>
    )
  }
}

