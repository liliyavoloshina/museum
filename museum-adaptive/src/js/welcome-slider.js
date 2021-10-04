import { tns } from 'tiny-slider/src/tiny-slider'

const welcomeSlider = tns({
  container: '#welcomeSlider',
  loop: true,
  mouseDrag: true,
  // speed: 1500,
  lazyload: true,
  navContainer: '#welcomePag',
  navAsThumbnails: true,
  prevButton: '#welcomePrev',
  nextButton: '#welcomeNext'
})

const curSlideNum = document.querySelector('#currentSlide')

welcomeSlider.events.on('indexChanged', () => {
  const info = welcomeSlider.getInfo()
  const indexCurr = info.index
  curSlideNum.textContent = `0${indexCurr}`
})