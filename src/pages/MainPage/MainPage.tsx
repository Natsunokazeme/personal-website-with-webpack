import "./MainPage.scss"
import {useEffect, useState} from "react"
import dayjs from "./../../utils/dayjs"
import React from "react"

const MainPage = (props: any) => {
  const [formattedTime, setFormattedTime] = useState("")
  useEffect(() => {
    const lastTime =
      localStorage.getItem("lastTime") ?? new Date().toISOString()
    setFormattedTime(dayjs(lastTime).format("llll"))
  }, [])

  return (
    <div className='main-body'>
      <div className='text-center pt-5'>上一次打开时间:{formattedTime}</div>
      {/* <Clock></Clock> */}
      {/* <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>magic</a> */}
    </div>
  )
}
export default MainPage
