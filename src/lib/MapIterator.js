
export const range = function*(length) {
  for(let i = 0; i < length; i++){
    yield i
  }
}

export const map = function*(x, y) {
  let iterY = range(y)
  for(var _y of iterY){
    let iterX = range(x)
    for(var _x of iterX){
      yield {x: _x, y:_y}
    }
  }
}