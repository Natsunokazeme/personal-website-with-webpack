import "./MainPage.scss"
import React, {useCallback, useEffect, useMemo} from "react"
import Clock from "../../components/Clock/Clock"
import DragSortList from "../../components/DragSortList/DragSortList"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import MusicOffIcon from "@mui/icons-material/MusicOff"
import {IconButton, Tooltip} from "@mui/material"
import Header from "../../components/Header/Header"
import axios from "axios"
import {audioVisualize} from "../../utils/audioVisualize"

let bgmReady = false

const MainPage = (props: any) => {
  const [musicOn, setMusicOn] = React.useState(false)
  const [bgUrl, setBgUrl] = React.useState("")

  const bgMusicRef = React.useRef<HTMLAudioElement>(null)

  const {audioCtx, analyser} = useMemo(() => {
    return audioVisualize()
  }, [])

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
      setBgUrl(res.data.res.anime_info.bg)
      if (bgMusicRef.current) {
        const proxyUrl = "/proxy" + res.data.res.play_url.split(".com")[1]
        bgMusicRef.current.src = proxyUrl
        bgMusicRef.current.addEventListener("canplay", () => {
          bgmReady = true
          //visualize music
          const source = audioCtx.createMediaElementSource(
            bgMusicRef.current as HTMLAudioElement
          )
          source.connect(analyser)
          analyser.connect(audioCtx.destination)
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
      {/* <div>page navigation cards</div>
      <div>recommend websites</div>
      <div>self learning notes</div> */}
      {/* <Tooltip
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
      </Tooltip> */}
      <div className='bg-music-wrapper'>
        <img
          src={bgUrl}
          className={`bg ${musicOn ? "bg-on" : "bg-off"}`}
          alt="background music's image"
          onClick={() => {
            bgmReady && setMusicOn(!musicOn)
          }}
        />
      </div>
      <audio crossOrigin='' ref={bgMusicRef} loop hidden></audio>
      {/* <DragSortList></DragSortList> */}
    </div>
  )
}

export default MainPage
