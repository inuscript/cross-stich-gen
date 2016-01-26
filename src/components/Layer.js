import React, { Component, PropTypes } from "react"
import ReactDOM from "react-dom"
import { Size } from "../lib/Grid"

export class Layer extends Component{
  static propTypes(){
    return {
      index: PropTypes.number.isRequired,
      size: PropTypes.instanceOf(Size).isRequired,
      onPaint: PropTypes.func
    }
  }
  get width(){
    return this.size.width
  }
  get height(){
    return this.size.height
  }
  get size(){
    return this.props.size.toObject()
  }
  componentDidMount(){
    let context = this.getContext()
    if(!this.props.onPaint){
      return
    }
    this.props.onPaint(context)
  }
  componentDidUpdate() {
    let context = this.getContext()
    if(!this.props.onPaint){
      return
    }
    this.props.onPaint(context);
  }
  getContext(){
    return ReactDOM.findDOMNode(this).getContext('2d')
  }
  clear(context){
    context.clearRect(0, 0, this.width, this.height);
  }
  render(){
    let style = {
      position: "absolute", 
      zIndex: this.props.index
    }

    return <canvas style={style} 
      {...this.size}
      {...this.props}  
    />
  }
}
