import React, {useEffect} from "react"
import "./App.scss"
import {ThemeProvider, createTheme} from "@mui/material"
import Loading from "./components/Loading/Loading"

// import CameraScan from "./components/CameraScan/CameraScan"
import {RouterProvider, createBrowserRouter} from "react-router-dom"
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

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
    },
  ])

  const [loading, setLoading] = React.useState(false)
  useEffect(() => {
    const updateTime = () => {
      localStorage.setItem("lastTime", new Date().toString())
    }
    const showLoading = (event: any) => {
      setLoading((event as CustomEvent).detail)
    }
    window.addEventListener("beforeunload", updateTime)
    document.addEventListener("ShowLoading", showLoading)
    return () => {
      document.removeEventListener("ShowLoading",showLoading )
      window.removeEventListener("beforeunload", updateTime)
    }
  }, [])

  return (
    <ThemeProvider theme={customTheme}>
      <div className='App'>
        {loading ? <Loading /> : null}
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  )
}

export default App
