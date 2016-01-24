import "babel-polyfill"
import {map} from "../../src/lib/MapIterator"
import assert from "assert"
describe("iterator", () => {
  it("test", () => {
    let expect = [
      { x: 0, y: 0 } ,
      { x: 1, y: 0 } ,
      { x: 2, y: 0 } ,
      { x: 0, y: 1 } ,
      { x: 1, y: 1 } ,
      { x: 2, y: 1 } ,
      { x: 0, y: 2 } ,
      { x: 1, y: 2 } ,
      { x: 2, y: 2 } 
    ]
    let iter = map(3,3)
    let result = []
    for(var m of iter){
      result.push(m)
    }
    assert.deepEqual(expect, result)
  })
})