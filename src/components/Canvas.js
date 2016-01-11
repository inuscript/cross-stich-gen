import React, { Component, PropTypes } from "react"
import ReactDOM from "react-dom"
import { flattenBitmap } from "../util"
import { PixelBox } from "../lib/pixel"

class Layer extends Component{
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
    let style = {position: "absolute", zIndex: this.props.index}
    // let { width, height } = this.props
    return <canvas style={style} {...this.props} />
  }
}

class ContextRender{
  constructor(context, pixSize = 10){
    this.context = context
    this.pixSize = pixSize
    this.boxer = new PixelBox(pixSize)
  }
  drawImage(bitmap, colors){
    let pixels = flattenBitmap(bitmap, colors)
    pixels.forEach( (pix) => {
      this.drawPix(pix.x, pix.y, pix.color)
    })
  }
  drawPix(x, y, color){
    if(!color){
      return
    }
    let pixSize = this.pixSize
    let grid = this.boxer.pointToBox(x, y)

    this.context.fillStyle = color
    this.context.fillRect(grid.x, grid.y, grid.w, grid.h)
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
    let render = new ContextRender(context)
    render.drawImage(this.props.bitmap, this.props.palette)
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
    console.log({gx, gy, x, y})
    this.props.paint(x, y, 1)
  }
  render(){
    let {bitmap, palette} = this.props
    let size = {width: 200, height: 200}
    return (
      <div>
        <DrawCanvas layer={1} {...size} {...this.props} />
        <EventCanvas layer={2} {...size} onClick={this.handleClick.bind(this)}/>
      </div>
    )
  }
}