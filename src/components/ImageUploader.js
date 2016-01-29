import React, { Component } from "react"
import ReactDOM from "react-dom"

class DummyImageLoader extends Component{
  getImageData(){
    let {img, canvas} = this.refs
    let context = ReactDOM.findDOMNode(canvas).getContext('2d')
    let scale = 0.1
    canvas.height = img.height * scale
    canvas.width = img.width * scale
    context.drawImage(img, 
      0, 0, img.width, img.height, 
      0, 0, canvas.width, canvas.height
    )
    // this.props.onLoadImage(context, canvas.width, canvas.height)
    let imageData = context.getImageData(0, 0, img.width, img.height)
    this.props.onLoadImage(imageData)
  }
  render(){
    return (
      <div>
        <canvas ref="canvas"/>
        <img 
          src="./resource/demo.png" ref="img" onLoad={this.getImageData.bind(this)}
          style={{display:"none"}}
        />
      </div>
    )
  }
}

export class ImageUploader extends Component{
  handleFile(){
    let fr = new FileReader()
    let file = e.target.files[0]
    reader.onload = (item) => {
    }
  }
  render(){
    return <div>
      <DummyImageLoader onLoadImage={this.props.loadImage} />
      <input type="file" onChange={this.handleFile} />
    </div>
  }
}