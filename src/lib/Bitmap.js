// import { Pixel, Color } from "./Entity"
import { Record, List } from "immutable"
import Point from "./Point"

class Color extends Record({r:0, g:0, b:0, a:255}){}

export class Pixel {
  constructor(point, color){
    this.point = new Point(point)
    this.color = new Color(color)
  }
  toColorString(){
    let c = this.color
    return `rgba(${c.r}, ${c.g}, ${c.b}, ${(c.a/255)})`
  }
}

export default class Bitmap { // extends List{
  constructor(width, height){
    // super()
    this.data = []
    this.width = width
    this.height = height
  }
  get(idx){
    return this.data[idx]
  }
  set(k, v){
    this.data[k] = v
    return this.clone()
  }
  getIndex(x, y){
    return (x + y * this.width)
  }
  getItem(x, y){
    let index = this.getIndex(x, y)
    return this.get(index)
  }
  setItem(x, y, colorObj){
    let index = this.getIndex(x, y)
    let pix = new Pixel({x, y}, colorObj)
    return this.set(index, pix)
  }
  toArray(){
    return this.data
  }
  clone(){ // TODO
    let cloned = new Bitmap(this.width, this.height)
    cloned.data = this.data
    return cloned
  }
}