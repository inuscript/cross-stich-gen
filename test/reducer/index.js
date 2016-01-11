import {bitmap} from "../../src/reducer/index"
import assert from "assert"
describe("bitmap", () => {
  it("can set map", () => {
    let result = bitmap([
      [0, 0],
      [0, 1]
    ], {
      type: 'PAINT',
      payload: { x: 1, y: 0, color: 2 }
    })
    assert.deepEqual(result, [
      [0, 2],
      [0, 1]
    ])
  })
})