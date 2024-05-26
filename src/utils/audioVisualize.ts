
export function audioVisualize() {
  const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
  const analyser = audioCtx.createAnalyser()
  analyser.fftSize = 512
  const bufferLength = analyser.frequencyBinCount
  const dataArray = new Uint8Array(bufferLength)

  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  canvas.width = screenWidth
  canvas.height = 300
  document.body.appendChild(canvas)

  function draw() {
    const WIDTH = canvas.width
    const HEIGHT = canvas.height

    requestAnimationFrame(draw)

    analyser.getByteFrequencyData(dataArray)
    if (ctx === null) throw new Error("ctx is null")
    ctx.fillStyle = "rgb(0, 0, 0)"
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
  }

  draw()

  return { analyser, audioCtx }
}
