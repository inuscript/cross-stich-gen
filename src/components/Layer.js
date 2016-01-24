import React, { Component, PropTypes } from "react"
import ReactDOM from "react-dom"
import { Size } from "../lib/Entity"

export class Layer extends Component{
  static propTypes(){
    return {
      index: PropTypes.number.isRequired,
      size: PropTypes.instanceOf(Size),
      onPaint: PropTypes.func
    }
  }
  get width(){
    return this.props.size.width
  }
  get height(){
    return this.props.size.height
  }
  get height(){
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

    return <canvas style={style} {...this.props} {...this.size} />
  }
}
