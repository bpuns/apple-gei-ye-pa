function isPowerLowCase() {
  return new Promise(resolve => {
    const start = Date.now()
    let frame = 0

    function step() {
      if (Date.now() - start < 100) {
        frame++
        window.requestAnimationFrame(step)
      } else {
        resolve(frame < 6)
      }
    }
    window.requestAnimationFrame(step)
  })
}

export default async function () {

  if (
    window &&
    window.requestAnimationFrame &&
    window.navigator &&
    window.navigator.userAgent &&
    /iphone/i.test(window.navigator.userAgent)
  ) {

    if (await isPowerLowCase()) {
      return {
        powerLowMode: true,
        close() {
          const b = document.createElement('div')
          b.style.pointerEvents = 'none'
          b.style.opacity = '0'
          b.style.width = '1800px'
          b.style.position = 'fixed'
          b.innerText = '.'
          document.body.appendChild(b)

          setTimeout(() => {
            b.style.transition = '1s transform'
            b.style.transform = 'translate(0)'

            setTimeout(() => {
              b.parentNode.removeChild(b)
            }, 100)

          })
        }
      }
    }

  }

  return {
    powerLowMode: false,
    close() { }
  }

}