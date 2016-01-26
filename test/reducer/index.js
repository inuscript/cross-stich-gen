import {bitmap} from "../../src/reducer/index"
import assert from "assert"
import Bitmap from "../../src/lib/Bitmap"
describe("bitmap", () => {
  it("can set map", () => {
    let t = new Bitmap(2,2)
    t.data = [
      0, 0,
      0, 1
    ]
    let result = bitmap(t, {
      type: 'PAINT',
      payload: { x: 1, y: 0, color: 2 }
    })
    assert.deepEqual(result.data, [
      0, 2, 
      0, 1
    ])
  })
})