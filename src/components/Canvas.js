import React, { Component, PropTypes } from "react"
import ReactDOM from "react-dom"
import { PixelBox } from "../lib/pixel"
import { Layer } from "./Layer"

// TODO: Remove
class ContextRender{
  constructor(context, width, height, pixSize = 1){
    this.context = context
    this.pixSize = pixSize
    this.width = width
    this.height = height
    this.boxer = new PixelBox(pixSize)
  }
  clean(){
    this.context.clearRect(0, 0, this.width, this.height);
  }
  reDrawImage(bitmap, palette){
    this.clean()
    let rects = this.boxer.getRects(bitmap)
    rects.forEach( (rect) => {
      let color = palette[rect.color] || "#fff"
      this.drawGrid(rect, color)
    })
  }
  drawGrid(rect, color){
    if(!color) return
    this.context.fillStyle = color
    this.context.fillRect(rect.x, rect.y, rect.w, rect.h)
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

export class DrawCanvas extends Component{
  constructor(){
    super()
  }
  doPaint(context){
    let render = new ContextRender(context, this.props.width, this.props.height, this.props.pixelSize)
    render.reDrawImage(this.props.bitmap, this.props.palette)
  }
  render(){
    return <Layer
      onPaint={this.doPaint.bind(this)}
      width={this.props.width}
      height={this.props.height}
    />
  }
}

export class PixelCanvas extends Component{
  constructor(){
    super()
    let pixSize = 10
    this.boxer = new PixelBox(pixSize)
  }
  handleClick(gx, gy){
    let {x, y} = this.boxer.cursorToPoint(gx, gy)
    this.props.paint(x, y, 1)
  }
  render(){
    let {bitmap, palette, pixelSize} = this.props
    let size = {width: 200, height: 200}
    return (
      <div>
        <DrawCanvas layer={1} {...size} {...this.props} />
        <EventCanvas layer={2} {...size} onClick={this.handleClick.bind(this)}/>
      </div>
    )
  }
}