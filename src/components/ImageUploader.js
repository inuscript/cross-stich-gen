import React, { Component } from "react"
import ReactDOM from "react-dom"

class DummyImageLoader extends Component{
  getImageData(){
    let {img, canvas} = this.refs
    let context = ReactDOM.findDOMNode(canvas).getContext('2d')
    canvas.height = img.height / 10
    canvas.width = img.width / 10
    context.scale(0.1, 0.1)
    context.drawImage(img, 0, 0, img.width, img.height)
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