import React, {useEffect} from "react"
import "./App.scss"
import {ThemeProvider, createTheme} from "@mui/material"
import Loading from "./components/Loading/Loading"

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
      <div className='App'>
        <Loading />
        {/* {loading ? <Loading /> : null} */}
        {/* <Router>
          <Routes>
            <Route path='/' element={<MainPage />}></Route>
            <Route path='/camera' element={<ImagePage />}></Route>
            <Route
              path='/create-account'
              element={<CreateAccountPage />}
            ></Route>
            <Route path='/my-account' element={<AccountPage />}></Route>
            <Route path='/wechat-settings' element={<WeChatPage />}></Route>
            <Route path='computer-notebook' element={<NotebookPage />}></Route>
            <Route
              path='/language-learning'
              element={<LanguageLearningPage />}
            ></Route>
            <Route path='/creation' element={<CreationPage />}></Route>
            <Route path='*' element={<div>404</div>}></Route>
          </Routes>
        </Router> */}
      </div>
    </ThemeProvider>
  )
}

export default App
