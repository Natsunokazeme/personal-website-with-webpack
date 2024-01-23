import ReactDOM from "react-dom/client"
import "./style.scss"
import App from "./App"
import React from "react"

// function component() {
//   const element = document.createElement("div")

//   // Lodash, currently included via a script, is required for this line to work
//   element.innerHTML = _.join(["Hello", "webpack"], " ")
//   element.classList.add("hello")
//   return element
// }

// document.body.appendChild(component())

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(<App />)
