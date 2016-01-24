import { map } from "../lib/MapIterator"

import React, { Component, PropTypes } from "react"
import ReactDOM from "react-dom"
// import { mapToRects } from "../lib/pixel"
import { ContextRender, render } from "../lib/render"
import { Layer } from "./Layer"
import { Size, Grid } from "../lib/Pixels"

// TODO: Remove
const mapToRects = function(bitmap){
  let grid = new Grid(4)
  return bitmap.map(function(item){
    let {x, y} = item.point
    let c = item.color
    let rect = grid.pixelToRect(x, y).toObject()
    let rgba = `rgba(${c.r}, ${c.g}, ${c.b}, ${(c.a/255)})`
    // console.log(rgba)

    return {
      rect : rect,
      color: rgba
    }
  })
}

const generateRenderRectFn = (rects) => {
  return function(context){
    rects.forEach( (pix) => {
      let color = pix.color || "#fff"
      let rect = pix.rect
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
    let pixels = mapToRects(bitmap)

    let fn = generateRenderRectFn(pixels)
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