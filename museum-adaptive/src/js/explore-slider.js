function initComparisons() {
  let isClicked = false

  const overlay = document.querySelector('.explore-img-overlay')
  const width = overlay.offsetWidth
  const slider = document.createElement('div')

  const changeSize = () => {
    overlay.style.width = '62%'
    slider.style.left = overlay.offsetWidth - slider.offsetWidth / 2 + 'px'
  }

  window.addEventListener('resize', changeSize)

  compare()

  function compare() {
    overlay.parentElement.insertBefore(slider, overlay)
    slider.classList.add('explore-img-slider')

    slider.style.top = 0 + 'px'
    slider.style.left = width / 1.6 - slider.offsetWidth / 1.6 + 'px'

    overlay.style.width = '62%'

    if (document.body.clientWidth > 420 && document.body.clientWidth < 1024) {
      overlay.style.width = '60%'
      slider.style.left = width / 1.6 - slider.offsetWidth / 1.1 + 'px'
    }

    if (document.body.clientWidth <= 420) {
      overlay.style.width = '58%'
      slider.style.left = width / 1.6 - slider.offsetWidth / 2 + 'px'
    }

    slider.addEventListener('mousedown', onSlideStart)
    slider.addEventListener('touchstart', onSlideStart)

    window.addEventListener('mouseup', () => (isClicked = false), {passive: true})
    window.addEventListener('touchstop', () => (isClicked = false), {passive: true})
    window.addEventListener('mousemove', onSlideMove, {passive: true})
    window.addEventListener('touchmove', onSlideMove, {passive: true})
  }

  function onSlideStart(event) {
    if (event.cancelable) {
      event.preventDefault()
    }
    isClicked = true
  }

  function onSlideMove(event) {
    if (!isClicked) return
    doSlide(currentPosition(event))
  }

  function currentPosition(event = window.event) {
    let xImage = overlay.getBoundingClientRect()
    let x = 0
    x = event.pageX - xImage.left
    if (x < 0) x = 0
    if (x > width) x = width
    return x
  }

  function doSlide(x) {
    overlay.style.width = x + 'px'

    slider.style.left = overlay.offsetWidth - slider.offsetWidth / 2 + 'px'

    if (document.body.clientWidth < 558) {
      console.log(overlay.style.width)
      slider.style.left = overlay.offsetWidth - slider.offsetWidth / 4 + 'px'
    }
  }
}

initComparisons()
