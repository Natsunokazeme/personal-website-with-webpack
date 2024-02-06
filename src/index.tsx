import ReactDOM from "react-dom/client"
import "./style.scss"
import App from "./App"
import React from "react"
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import Loading from "./components/Loading/Loading"

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
    path: "/q",
    element: <App />,
  },
  {
    path: "loading",
    element: <Loading />,
  },
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
)
