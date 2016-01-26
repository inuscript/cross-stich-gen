// import { Pixel, Color } from "./Entity"
import { Record } from "immutable"

class PixelPoint extends Record({x:0, y:0}){}

class Color extends Record({r:0, g:0, b:0, a:0}){}

export class Pixel {
  constructor(point, color){
    this.point = new PixelPoint(point)
    this.color = new Color(color)
  }
  toColorString(){
    let c = this.color
    return `rgba(${c.r}, ${c.g}, ${c.b}, ${(c.a/255)})`
  }
}

export default class Bitmap {
  constructor(width, height){
    this.data = []
    this.width = width
    this.height = height
  }
  getIndex(x, y){
    return (x + y * this.width)
  }
  get(x, y){
    let index = this.getIndex(x, y)
    return this.data[index]
  }
  set(x, y, colorObj){
    let index = this.getIndex(x, y)
    this.data[index] = new Pixel({x, y}, colorObj)
  }
  toArray(){
    return this.data
  }
}