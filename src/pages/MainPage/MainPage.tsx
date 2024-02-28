import "./MainPage.scss"
import React from "react"
import Clock from "../../components/Clock/Clock"

const MainPage = (props: any) => {
  return (
    <div className='main-body'>
      <Clock></Clock>
      <div>email: natsunokazeme@gmail.com</div>
      <div>self introduce </div>
      <div>page navigation cards</div>
      <div>recommend websites</div>
      <div>self learning notes</div>
    </div>
  )
}
export default MainPage
