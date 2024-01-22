import _ from "lodash"
import "./style.css"
import React from "react"
import ReactDOM from "react-dom"

// function component() {
//   const element = document.createElement("div")

//   // Lodash, currently included via a script, is required for this line to work
//   element.innerHTML = _.join(["Hello", "webpack"], " ")
//   element.classList.add("hello")
//   return element
// }

// document.body.appendChild(component())

const App = () => {
  return (
    <div>
      <p>Hello React!</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
