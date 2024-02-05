import ReactDOM from "react-dom/client"
import "./style.scss"
import App from "./App"
import React from "react"
import {RouterProvider, createBrowserRouter} from "react-router-dom"

// function component() {
//   const element = document.createElement("div")

//   // Lodash, currently included via a script, is required for this line to work
//   element.innerHTML = _.join(["Hello", "webpack"], " ")
//   element.classList.add("hello")
//   return element
// }

// document.body.appendChild(component())
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <div>123</div>
      </div>
    ),
  },
  {
    path: "q",
    element: <App />,
    children: [
      {
        path: "camera",
        element: <div>12child3</div>,
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(<RouterProvider router={router} />)
