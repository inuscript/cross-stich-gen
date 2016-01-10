import React, { Component } from "react"
import ReactDom from "react-dom"
import {CrossStichApp} from "./components/App" 
var container = document.querySelector("#container")

ReactDom.render(<CrossStichApp />, container)
