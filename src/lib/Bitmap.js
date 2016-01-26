// TODO: width...?
export default class {
  constructor(width, data=[], range = 1){
    this.data = data
    this.width = width
    this.range = range
  }
  getIndex(x, y){
    return (x + y * this.width) * this.range
  }
  get(x, y){
    let index = this.getIndex(x, y)
    if(this.dataRange === 1){
      return this.data[index]
    }
    let chunk = this.data.slice(index, index + this.range)
    return chunk
  }
  set(x, y, data){
    let index = this.getIndex(x, y)
    this.data[index] = data
  }
}