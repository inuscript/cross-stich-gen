const React = require("react")
const ReactDom = require("react-dom")
const { Component } = React
const fs = require("fs")
const path = require("path")

const bgmDir = "/Users/inuscript/otake/bgm"
const filterMp3 = (dir) => {
  return fs.readdirSync(dir).filter( (file) => {
    return file.indexOf("mp3") > -1
  }).map ( (file) => {
    return path.resolve(dir , file)
  })
}
const audios = filterMp3(bgmDir)

class Audio extends Component {
  render() {
    let {title, url} = this.props
    return <div style={{paddingBottom:"20px"}} >
      <div>{title}</div>
      <audio src={url} volume={0.5} controls preload="metadata" />
    </div>
  }
}

const Button = () => {
  return <div>play</div>
}

class Player extends Component{
  render(){
    let players = audios.map( (path, i) => {
      return <Audio url={path} title={path} key={i}/>
    })
    return <div>
      {players}
    </div>
  }
}

var container = document.querySelector("#container")

ReactDom.render(<Player />, container)
