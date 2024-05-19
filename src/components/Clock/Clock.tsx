import "./Clock.scss"
import {useMemo, useRef, useState} from "react"
import {useEffect} from "react"
import dayjs from "./../../utils/dayjs"
import React from "react"

const Clock = () => {
  const [curTime, setCurTime] = useState(new Date())
  const maxSize = Math.max(
    window.innerWidth > window.innerHeight
      ? window.innerHeight
      : window.innerWidth,
    250
  )

  const currentTime = useRef(new Date())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurTime(new Date())
    }, 1000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const circleElements = (
    size: number,
    radius: number,
    initIndex: number,
    config?: {
      label?: string
      highLightIndex?: number
      hightLightColor?: string
      color?: string
    },
    customTimeFormat?: string[]
  ) =>
    Array.from({length: size}, (_, index) => (
      <div
        className='inline-block bg-transparent w-16 h-4 absolute top-0 bottom-0 left-0 right-0 m-auto transition-transform border-0 duration-[1s] will-change-transform'
        style={{
          color:
            index === config?.highLightIndex
              ? config?.hightLightColor ?? "white"
              : config?.color ?? "grey",
          transform: `translate(${
            Math.sin(((index - initIndex) / size + 1 / 4) * 2 * Math.PI) *
            radius
          }px,${
            Math.cos(((index - initIndex) / size + 1 / 4) * 2 * Math.PI) *
            -radius
          }px) rotate(${(index - initIndex) / size}turn)`,
        }}
        key={index}
      >
        {customTimeFormat?.[index] ?? index.toString().padStart(2, "0")}
        {config?.label}
      </div>
    ))

  const formattedDate = useMemo(() => {
    return dayjs(curTime).format("LLLL")
  }, [curTime.getMinutes()])

  const seconds = useMemo(() => {
    return circleElements(
      60,
      (40 / 100) * maxSize,
      currentTime.current.getSeconds(),
      {
        label: "秒",
        highLightIndex: curTime.getSeconds(),
        hightLightColor: "var(--secondary-theme-color)",
      }
    )
  }, [curTime.getSeconds(), maxSize])

  const minutes = useMemo(() => {
    // +1 to beautify the animation
    return circleElements(60, (32 / 100) * maxSize, curTime.getMinutes(), {
      label: "分",
      highLightIndex: curTime.getMinutes(),
      hightLightColor: "var(--secondary-theme-color)",
    })
  }, [curTime.getMinutes(), maxSize])

  const hours = useMemo(() => {
    // +1 to beautify the animation
    return circleElements(
      12,
      (16 / 100) * maxSize,
      Math.floor(curTime.getHours() / 2),
      {
        // label: "时",
        highLightIndex: Math.floor(curTime.getHours() / 2),
        hightLightColor: "var(--secondary-theme-color)",
      },
      ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]
    )
  }, [curTime.getHours(), maxSize])

  return (
    <div className='clock-wrapper'>
      <div className='text-center pt-5 text-gray-400'>
        Clock size will fit the screen size, try it
      </div>
      <h1 className='date'>{formattedDate}</h1>
      <div className='clock'>
        <div className='seconds'>{seconds}</div>
        <div className='minutes'>{minutes}</div>
        <div className='hours'>{hours}</div>
      </div>
    </div>
  )
}

export default Clock
