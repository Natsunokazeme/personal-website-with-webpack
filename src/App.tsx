import React, {useEffect} from "react"
import "./App.scss"
import {ThemeProvider, createTheme} from "@mui/material"
import Loading from "./components/Loading/Loading"

import CameraScan from "./components/CameraScan/CameraScan"
import {
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom"
import MainPage from "./pages/MainPage/MainPage"

function App() {
  const customTheme = createTheme({
    palette: {
      primary: {
        main: "#673ab7",
      },
      secondary: {
        main: "#8561c5",
      },
    },
  })

  const [loading, setLoading] = React.useState(false)
  useEffect(() => {
    document.addEventListener("ShowLoading", (event) => {
      setLoading((event as CustomEvent).detail)
    })
    return () => {
      document.removeEventListener("ShowLoading", () => {})
    }
  }, [])

  return (
    <ThemeProvider theme={customTheme}>
      <div className='App'>{loading ? <Loading /> : null}</div>
    </ThemeProvider>
  )
}

export default App
