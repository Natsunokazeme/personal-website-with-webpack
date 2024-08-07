import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
  Tooltip,
  createSvgIcon,
} from "@mui/material"
import "./Header.scss"
import {FC, useEffect, useState} from "react"
import {AccountCircle, CameraAlt, NearMe, Upload} from "@mui/icons-material"
import SearchWrapper from "../../components/SearchWrapper/SearchWrapper"
import LoginDialog from "../../components/LoginDialog/LoginDialog"
import {useNavigate} from "react-router-dom"
import * as apis from "../../api/api"
import MD5 from "crypto-js/md5"
import * as Enums from "../../enums"
import SnackAlert from "../../components/SnackAlert/SnackAlert"
import TranslateIcon from "@mui/icons-material/Translate"
import BrushIcon from "@mui/icons-material/Brush"
import AutoStoriesIcon from "@mui/icons-material/AutoStories"
import WeChat from "../../assets/icons/weChat.svg"
import DayMode from "../../assets/icons/daymode.svg"
import NightMode from "../../assets/icons/moon.svg"
import React from "react"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import {useTheme} from "../../utils/useTheme"

interface SnackbarConfig {
  message: string
  type: Enums.AlertType
  show: boolean
}

interface HeaderProps {}

const Header: FC<HeaderProps> = (props) => {
  const [showLogin, setShowLogin] = useState(false)
  const [showNavigation, setShowNavigation] = useState(false)
  const [avatar, setAvatar] = useState("")
  const [showMenu, setShowMenu] = useState(false)
  const [alertConfig, setAlertConfig] = useState<SnackbarConfig>({
    message: "",
    type: Enums.AlertType.SUCCESS,
    show: false,
  })
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const navigate = useNavigate()
  const {theme, setTheme} = useTheme()

  const handleLogin = (username: string, password: string) => {
    const hashToken = MD5(password).toString()

    apis
      .post("user/login", {
        username,
        password: hashToken,
      })
      .then((response: any) => {
        const data = response.data
        setAvatar(data.avatar ?? data.username)
        // avatar = data.imgurl
        // localStorage.setItem('avatar', avatar ?? '')
        setAlertConfig({
          message: data.message,
          type: Enums.AlertType.SUCCESS,
          show: true,
        })
        setShowLogin(false)
      })
      .catch((error) => {
        if (error.response.data.message) {
          setAlertConfig({
            message: error.response.data.message,
            type: Enums.AlertType.ERROR,
            show: true,
          })
        }
      })
  }

  const handleNavigation = () => {
    apis
      .get("/IPAdress", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response)
        setShowNavigation(!showNavigation)
      })
  }

  const handleSearch = (value: string) => {
    if (!value || value.trim() === "") {
      return
    }
    // // TODO: search api
    // apis.get(`/search?id=${value}`).then((response: any) => {
    //   console.log(response)
    //   if (response.result.code === 404) {
    //     showSnackbarCallback({
    //       message: 'search failed, word not found',
    //       type: 'error',
    //     })
    //   }
    // })

    // mdj text2img api
    apis
      .post(`/createImage`, {
        prompt: value,
        steps: 100,
        width: window.innerWidth / 2,
        height: window.innerHeight / 2,
      })
      .then((response: any) => {
        const image = new Image()
        image.src = "data:image/png;base64," + response.data.data
        image.onload = () => {
          document.body.appendChild(image)
          //download image
          // const a = document.createElement('a')
          // a.href = image.src
          // a.download = `${value}.png`
          // a.click()
        }
        // if (response.result.code === 404) {
        //   showSnackbarCallback({
        //     message: 'search failed, word not found',
        //     type: 'error',
        //   })
        // }
      })
  }

  const handleImportBook = () => {
    console.warn("import book")
    apis
      .post(
        "/word/create",
        {
          text: "hello",
          enTranslation: "hello",
          zhTranslation: "你好",
          pronunciation: "hello",
          example: "hello world",
          imageUrl: "https://www.baidu.com/img/flexible/logo/pc/result.png",
          audioSrc: "https://www.w3school.com.cn/i/song.mp3",
          extra: "extra",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response)
        // if (response.result.code === 404) {
        //   showSnackbarCallback({
        //     message: 'search failed, word not found',
        //     type: 'error',
        //   })
        // }
      })
  }
  // const showSnackbarCallback = (config: SnackbarConfig) => {
  //   setAlertConfig(config)
  // }

  const menuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setShowMenu(true)
  }

  const menuClose = () => {
    setShowMenu(false)
  }

  const handleLogout = () => {
    apis.post("/user/logout", {}).then((response: any) => {
      const data = response.data
      if (data.code === 200) {
        setAlertConfig({
          message: data.message,
          type: Enums.AlertType.SUCCESS,
          show: true,
        })
      }
      menuClose()
    })
  }

  const WeChatIcon = createSvgIcon(<WeChat />, "WeChatIcon")

  return (
    <AppBar className='header' position='sticky'>
      <Toolbar>
        <Tooltip arrow title='language learning'>
          <span>
            <IconButton
              disabled
              size='large'
              edge='start'
              color='inherit'
              aria-label='language learning'
              onClick={() => navigate("/language-learning")}
            >
              <TranslateIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip arrow title='creation'>
          <span>
            <IconButton
              disabled
              size='large'
              edge='start'
              color='inherit'
              aria-label='creation'
              onClick={() => navigate("/creation")}
            >
              <BrushIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip arrow title='finance'>
          <span>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='creation'
              onClick={() => navigate("/finance")}
            >
              <AttachMoneyIcon />
            </IconButton>
          </span>
        </Tooltip>
        {/* <Tooltip arrow title='weChat settings'>
          <IconButton
            disabled
            size='large'
            edge='start'
            color='inherit'
            aria-label='weChat settings'
            onClick={() => navigate("/wechat-settings")}
          >
            <WeChatIcon />
          </IconButton>
        </Tooltip> */}
        <Tooltip arrow title='computer notebook'>
          <span>
            <IconButton
              disabled
              size='large'
              edge='start'
              color='inherit'
              aria-label='computer notebook'
              onClick={() => navigate("/computer-notebook")}
            >
              <AutoStoriesIcon />
            </IconButton>
          </span>
        </Tooltip>
        <IconButton
          disabled
          size='large'
          edge='start'
          color='inherit'
          aria-label='show navigation'
          sx={{mr: 2}}
          onClick={() => handleNavigation()}
        >
          <NearMe />
        </IconButton>
        <SearchWrapper
          searchCallback={(value) => {
            handleSearch(value)
          }}
        />
        <Tooltip arrow title='import book'>
          <span>
            <IconButton
              disabled
              size='large'
              edge='start'
              color='inherit'
              aria-label='import book'
              onClick={() => handleImportBook()}
            >
              <Upload />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip arrow title='camera'>
          <span>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='camera'
              onClick={() => navigate("/camera")}
            >
              {/* <NavLink className={'text-xs'} to='camera' end> */}
              <CameraAlt />
              {/* </NavLink> */}
            </IconButton>
          </span>
        </Tooltip>
        {avatar && avatar !== "" ? (
          <>
            <Avatar
              alt={avatar}
              src={avatar}
              onClick={(e) => {
                menuOpen(e)
              }}
            ></Avatar>
            <Menu anchorEl={anchorEl} open={showMenu} onClose={menuClose}>
              <MenuItem onClick={() => navigate("/my-account")}>
                My account
              </MenuItem>
              <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Tooltip arrow title='login'>
            <span>
              <IconButton
                size='large'
                edge='start'
                color='inherit'
                aria-label='login'
                onClick={() => setShowLogin(true)}
              >
                <AccountCircle />
              </IconButton>
            </span>
          </Tooltip>
        )}
        <span
          className='hover:cursor-pointer'
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark")
          }}
        >
          <Switch
            checked={theme === "dark"}
            checkedIcon={<NightMode />}
            icon={<DayMode />}
            disableRipple
          />
        </span>
      </Toolbar>
      <LoginDialog
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        handleLogin={handleLogin}
      ></LoginDialog>
      <SnackAlert
        show={alertConfig.show}
        onClose={() => setAlertConfig({...alertConfig, show: false})}
        message={alertConfig.message}
        type={alertConfig.type}
      ></SnackAlert>
    </AppBar>
  )
}
export default Header
