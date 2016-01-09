import React, { Component } from "react"
import ReactDom from "react-dom"
import {CrossStichApp} from "./components/Canvas" 
var container = document.querySelector("#container")

ReactDom.render(<CrossStichApp />, container)
