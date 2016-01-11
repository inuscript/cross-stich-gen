import React, { Component } from "react"

class DemoImage extends Component{
  render(){
    return <img src="./resource/demo.png" />
  }
}

export class ImageUploader extends Component{
  handleFile(){
    let fr = new FileReader()
    let file = e.target.files[0]
  }
  render(){
    return <div>
      <DemoImage />
      <input type="file" onChange={this.handleFile} />
    </div>
  }
}