
const aaa = (context, width, height) => {
  let imageData = context.getImageData(0, 0, width, height)
}
const bbb = (imageData) => {
  let { data, width, height } = imageData
}











// imageData -> { rgba}
const imageToPixels = (data) => {
  if(data.length % 4 !== 0){
    throw new Error("Invalid Data")
  }
  let pixelRange = range(0, data.length / 4)
  return pixelRange.map((i) => {
    let p = {
      r: data[4 * i + 0],
      g: data[4 * i + 1],
      b: data[4 * i + 2],
      a: data[4 * i + 3],
    }
    return `rgba(${p.r}, ${p.g}, ${p.b}, ${p.a})`
  })
}

const imageToRGBA = (imageData) => {
  const {data, height, width} = imageData
  let pixels = imageToPixels(data)
  let palette = uniq(pixels)

  let map = range(0, height).map( (y) => {
    return range(0, width).map( (x) => {
      let i = (x + y * width)
      let p = palette.indexOf(pixels[i])
      return p
    })
  })
  return { map, palette }
}
