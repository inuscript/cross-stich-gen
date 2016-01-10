import React, {Component} from "react"
import ReactDOM from "react-dom"
import {flattenBitmap} from "../util"

class ContextRender{
  constructor(context, pixSize = 10){
    this.context = context
    this.pixSize = pixSize
  }
  drawImage(bitmap, colors){
    let pixels = flattenBitmap(bitmap, colors)
    pixels.forEach( (pix) => {
      this.drawPix(pix.x, pix.y, pix.color)
    })
  }
  getPixRect(x, y){
    
  }
  drawPix(x, y, color){
    if(!color){
      return
    }
    let pixSize = this.pixSize
    this.context.fillStyle = color
    this.context.fillRect(x * pixSize, y * pixSize, pixSize, pixSize)
  }
}

export class Layer extends Component{
  getContext(){
    return ReactDOM.findDOMNode(this).getContext('2d')
  }
  render(){
    let style = {position: "absolute", zIndex: this.props.zIndex}
    return <canvas style={style} />
  }
}

export class DrawCanvas extends Component{
  constructor(){
    super()
    this.width = 200;
    this.height = 200;
  }
  getContext(){
    return ReactDOM.findDOMNode(this).getContext('2d')
  }
  componentDidMount(){
    let context = this.getContext()
    this.paint(context)
  }
  componentDidUpdate() {
    let context = this.getContext()
    this.clear(context);
    this.paint(context);
  }
  paint(context){
    let render = new ContextRender(context)
    render.drawImage(this.props.bitmap, this.props.palette)
  }
  clear(context){
    context.clearRect(0, 0, this.width, this.height);
  }
  handleClick(e){
    console.log(e.target.getBoundingClientRect())
  }
  handleMouseMove(e){
    
  }
  render(){
    let style = {}
    return <canvas 
      style={style} 
      onClick={this.handleClick.bind(this)}
      onMouseMove={this.handleMouseMove.bind(this)}
    />
  }
}