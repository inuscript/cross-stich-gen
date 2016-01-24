// import { mapToRects } from "./pixel"

// @deprecated
export class ContextRender{
  constructor(context, width, height, pixSize = 1){
    this.context = context
    this.pixSize = pixSize
    this.width = width
    this.height = height
  }
  clean(){
    this.context.clearRect(0, 0, this.width, this.height);
  }
  reDrawImage(bitmap, palette){
    this.clean()
    let rects = mapToRects(bitmap, this.pixSize)
    rects.forEach( (rect) => {
      let color = palette[rect.color] || "#fff"
      this.drawGrid(rect, color)
    })
  }
  drawGrid(rect, color){
    if(!color) return
    this.context.fillStyle = color
    this.context.fillRect(rect.x, rect.y, rect.w, rect.h)
  }
}
