import "./MainPage.scss"
import React, {useCallback, useEffect} from "react"
import Clock from "../../components/Clock/Clock"
import DragSortList from "../../components/DragSortList/DragSortList"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import MusicOffIcon from "@mui/icons-material/MusicOff"
import {IconButton, Tooltip} from "@mui/material"
import Header from "../../components/Header/Header"
import axios from "axios"

let bgmReady = false

const MainPage = (props: any) => {
  const [musicOn, setMusicOn] = React.useState(false)

  const bgMusicRef = React.useRef<HTMLAudioElement>(null)

  const handleMusicToggle = useCallback(() => {
    const bgMusic = bgMusicRef.current
    if (bgMusic && bgmReady) {
      if (musicOn) {
        bgMusic.play()
      } else {
        bgMusic.pause()
      }
    }
  }, [musicOn])

  useEffect(() => {
    handleMusicToggle()
  }, [handleMusicToggle])

  useEffect(() => {
    axios.get("https://anime-music.jijidown.com/api/v2/music").then((res) => {
      if (bgMusicRef.current) {
        bgMusicRef.current.src = res.data.res.play_url
        bgMusicRef.current.addEventListener("canplay", () => {
          bgmReady = true
        })
      }
    })
    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.removeEventListener("canplay", () => {
          bgmReady = false
        })
      }
    }
  }, [])

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
        title='Random Anime Music'
        className='bg-music'
      >
        <IconButton
          onClick={() => {
            bgmReady && setMusicOn(!musicOn)
          }}
        >
          {musicOn ? (
            <MusicNoteIcon sx={{fontSize: 80}} />
          ) : (
            <MusicOffIcon sx={{fontSize: 80}} />
          )}
        </IconButton>
      </Tooltip>
      <audio ref={bgMusicRef} loop hidden></audio>
      {/* <DragSortList></DragSortList> */}
    </div>
  )
}
export default MainPage
