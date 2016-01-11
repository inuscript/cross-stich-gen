import React, { Component, PropTypes } from "react"
import ReactDOM from "react-dom"

export class Layer extends Component{
  static propTypes(){
    return {
      index: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      onPaint: PropTypes.func
    }
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
    context.clearRect(0, 0, this.props.width, this.props.height);
  }
  render(){
    let style = {
      position: "absolute", 
      zIndex: this.props.index
    }
    // let { width, height } = this.props
    return <canvas style={style} {...this.props} />
  }
}
