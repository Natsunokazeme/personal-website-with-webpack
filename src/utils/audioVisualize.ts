
export function audioVisualize() {
  const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
  const analyser = audioCtx.createAnalyser()
  analyser.fftSize = 512
  const bufferLength = analyser.frequencyBinCount
  const dataArray = new Uint8Array(bufferLength)

  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  // dynamically set the canvas size while screen size changes
  window.addEventListener("resize", () => {
    const screenWidth = window.innerWidth
    canvas.width = screenWidth
  })

  canvas.width = window.innerWidth
  canvas.height = 300
  document.body.appendChild(canvas)

  // function drawCircle() {
  //   if (ctx === null) throw new Error("ctx is null")
  //   ctx.beginPath()
  //   ctx.arc(100, 75, 50, 0, 2 * Math.PI)
  //   ctx.lineWidth = 2;
  //   ctx.strokeStyle = "#ff0000"
  //   ctx.stroke()
  //   ctx.drawImage
  // }

  function drawRect() {

    const WIDTH = canvas.width
    const HEIGHT = canvas.height
    analyser.getByteFrequencyData(dataArray)
    if (ctx === null) throw new Error("ctx is null")
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const mainColor = localStorage.getItem("theme") === "dark" ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)";
    ctx.fillStyle = mainColor
    ctx.fillRect(0, 0, WIDTH, HEIGHT)

    const barWidth = (WIDTH / bufferLength) * 2.5
    let barHeight
    let x = 0

    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i]

      ctx.fillStyle = "rgb(" + (barHeight + 100) + ",50,50)"
      ctx.fillRect(x, HEIGHT - barHeight / 256 * HEIGHT, barWidth, barHeight / 256 * HEIGHT)

      x += barWidth + 1
    }
    requestAnimationFrame(drawRect)
  }

  drawRect()

  return { analyser, audioCtx }
}
