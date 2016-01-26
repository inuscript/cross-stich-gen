import Bitmap from "../../src/lib/Bitmap"

describe("lib-bitmap", () => {
  it("get item", () => {
    let bit = new Bitmap(2, 2)
    bit.set(0, 1, "foo")
    assert.equal("foo", bit.get(0, 1))
  })
})
