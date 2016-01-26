// TODO: width...?
export default class Matrix {
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
  set(x, y, obj){
    let index = this.getIndex(x, y)
    this.data[index] = obj
  }
  toArray(){
    return this.data
  }
}