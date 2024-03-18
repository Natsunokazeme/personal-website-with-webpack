import "./MainPage.scss"
import React from "react"
import Clock from "../../components/Clock/Clock"
import DragSortList from "../../components/DragSortList/DragSortList"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import MusicOffIcon from "@mui/icons-material/MusicOff"
import {IconButton, Tooltip} from "@mui/material"
import Header from "../../components/Header/Header"

const MainPage = (props: any) => {
  const [musicOn, setMusicOn] = React.useState(true)
  return (
    <div className='main-body'>
      <Header></Header>

      <Clock></Clock>
      <div className='self-info'>
        <div className='email'>natsunokazeme@gmail.com</div>
        <div>hello,I'm Natsume. this is my personal space for fun.</div>
        <div>
          My planning for this year(2024) is to create some interesting projects
          and share them, Hope you can find something interesting here.
        </div>
      </div>
      <div></div>
      <div>page navigation cards</div>
      <div>recommend websites</div>
      <div>self learning notes</div>
      <Tooltip
        placement='left-start'
        title='One of my favorite songs is cannon, here is a version of it. Hope you
        enjoy it.'
        className='bg-music'
      >
        <IconButton
          onClick={() => {
            setMusicOn(!musicOn)
          }}
        >
          {musicOn ? (
            <MusicNoteIcon sx={{fontSize: 80}} />
          ) : (
            <MusicOffIcon sx={{fontSize: 80}} />
          )}
        </IconButton>
      </Tooltip>
      <audio
        src='https://music.163.com/song/media/outer/url?id=1491384650.mp3'
        autoPlay
        loop
        hidden
        muted={!musicOn}
      ></audio>
      <DragSortList></DragSortList>
    </div>
  )
}
export default MainPage
