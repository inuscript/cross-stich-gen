import { map } from "../lib/MapIterator"

import React, { Component, PropTypes } from "react"
import ReactDOM from "react-dom"
// import { mapToRects } from "../lib/pixel"
import { ContextRender, render } from "../lib/render"
import { Layer } from "./Layer"
import { Size, Grid, Pixel } from "../lib/Pixels"


const generateRenderRectFn = (rects) => {
  let grid = new Grid(4)
  return function(context){
    rects.forEach( (pix) => {
      let color = pix.toColorString()
      let rect = grid.pixelToRect(pix)
      // console.log(color, rect)
      // console.log(rect)
      context.fillStyle = color
      context.fillRect(rect.x, rect.y, rect.w, rect.h)
    })
  }
}

export class EventCanvas extends Component{
  calcCurrentPos(e){
    let { target, clientX, clientY } = e
    let { left, top } = target.getBoundingClientRect()
    let x = clientX - left
    let y = clientY - top
    return {x, y}
  }
  handleClick(e){
    let {x, y} = this.calcCurrentPos(e)
    this.props.onClick(x, y)
  }
  handleMouseMove(e){
    let {x, y} = this.calcCurrentPos(e)
  }
  render(){
    return <Layer 
      onClick={this.handleClick.bind(this)}
      onMouseMove={this.handleMouseMove.bind(this)}
    />
  }
}

class DrawCanvas extends Component{
  constructor(){
    super()
  }
  render(){
    return <Layer
      onPaint={this.props.onPaint}
      size={this.size}
    />
  }
}


export class PixelCanvas extends Component{
  constructor(){
    super()
    let pixSize = 10
    this.size =  new Size({width: 200, height: 200})
  }
  handleEventCanvasClick(gx, gy){
    let {x, y} = this.boxer.cursorToPoint(gx, gy)
    this.props.paint(x, y, 1)
  }
  handlePixelDraw(context){
    let { bitmap } = this.props

    let { width, height } = this.size.toObject()
    context.clearRect(0, 0, width, height);
    let fn = generateRenderRectFn(bitmap)
    fn(context)
  }
  render(){
    let {bitmap, palette, pixelSize} = this.props
    return (
      <div>
        <DrawCanvas 
          layer={1} 
          size={this.size}
          onPaint={this.handlePixelDraw.bind(this)}
        />
        <EventCanvas layer={2} size={this.size}  
          onClick={this.handleEventCanvasClick.bind(this)}
        />
      </div>
    )
  }
}