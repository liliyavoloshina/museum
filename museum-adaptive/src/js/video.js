const currentVideo = document.querySelector('#currentVideo')
const currentSource = document.querySelector('#currentSource')
const currentVideoBigPlay = document.querySelector('#currentVideoLargePlay')
const currentVideoSmallPlay = document.querySelector('#currentVideoSmallPlay')
const currentVideoProgress = document.querySelector('#currentVideoProgress')
const currentVideoVolumeRange = document.querySelector('#currentVideoVolumeRange')
const currentVideoVolumeBtn = document.querySelector('#currentVideoVolumeBtn')
const currentVideoFullscreenBtn = document.querySelector('#currentVideoFullscreenBtn')
const fullscreenWrapper = document.querySelector('#fullscreenWrapper')

let currentVideoSrc = './video/video0.mp4'
currentSource.setAttribute('src', currentVideoSrc)
currentVideo.load()
currentVideo.volume = 0.5

let fullscreenMode = false

currentVideo.addEventListener('click', togglePlayBtn)
currentVideoBigPlay.addEventListener('click', togglePlayBtn)
currentVideoSmallPlay.addEventListener('click', togglePlayBtn)
currentVideoVolumeBtn.addEventListener('click', toggleVolumeBtn)
currentVideoVolumeRange.addEventListener('input', handleVolume)
currentVideoProgress.addEventListener('input', handleProgress)
currentVideoFullscreenBtn.addEventListener('click', toggleFullscreen)
currentVideo.addEventListener('timeupdate', watchProgess)
document.addEventListener('fullscreenchange', watchFullscreen)

function togglePlayBtn() {
  if (currentVideo.paused) {
    currentVideo.play()
    currentVideoBigPlay.classList.add('hidden')
    currentVideoSmallPlay.classList.add('paused')
  } else {
    currentVideo.pause()
    currentVideoBigPlay.classList.remove('hidden')
    currentVideoSmallPlay.classList.remove('paused')
  }
}

function handleProgress() {
  const newTime = (this.value / 100) * currentVideo.duration
  currentVideo.currentTime = newTime
}

function watchProgess() {
  if (!currentVideo.paused) {
    const newValue = Math.round((100 / this.duration) * this.currentTime)
    currentVideoProgress.value = newValue
    currentVideoProgress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${newValue}%, #c4c4c4 ${newValue}%, #c4c4c4 100%)`
  }

  if (this.currentTime === this.duration) {
    currentVideoBigPlay.classList.remove('hidden')
    currentVideoSmallPlay.classList.remove('paused')
  }
}

function toggleVolumeBtn() {
  if (currentVideo.muted) {
    currentVideo.muted = false
    currentVideo.volume = 0.5
    currentVideoVolumeBtn.classList.remove('muted')
    currentVideoVolumeRange.value = currentVideo.volume
    currentVideoVolumeRange.style.background = `linear-gradient(to right, #710707 0%, #710707 50%, #c4c4c4 50%, #c4c4c4 100%)`
  } else {
    currentVideo.muted = true
    currentVideoVolumeBtn.classList.add('muted')
    currentVideoVolumeRange.value = 0
    currentVideoVolumeRange.style.background = `linear-gradient(to right, #710707 0%, #710707 0%, #c4c4c4 0%, #c4c4c4 100%)`
  }
}

function handleVolume() {
  const value = this.value
  currentVideo.volume = value
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value * 100}%, #c4c4c4 ${value *
    100}%, #c4c4c4 100%)`

  if (currentVideo.volume === 0) {
    currentVideo.muted = true
    currentVideoVolumeBtn.classList.add('muted')
  }
}

function toggleFullscreen() {
  if (!fullscreenMode) {
    if (fullscreenWrapper.requestFullscreen) {
      fullscreenWrapper.requestFullscreen()
    } else if (fullscreenWrapper.mozRequestFullScreen) {
      fullscreenWrapper.mozRequestFullScreen()
    } else if (fullscreenWrapper.webkitRequestFullscreen) {
      fullscreenWrapper.webkitRequestFullscreen()
    } else if (fullscreenWrapper.msRequestFullscreen) {
      fullscreenWrapper.msRequestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  }
}

function watchFullscreen() {
  if (!document.fullscreenElement) {
    fullscreenMode = false
    fullscreenWrapper.classList.remove('expanded')
    currentVideoFullscreenBtn.classList.remove('exit')
  } else {
    fullscreenWrapper.classList.add('expanded')
    fullscreenMode = true
    currentVideoFullscreenBtn.classList.add('exit')
  }
}

const slider = document.querySelector('#videoSlider'),
  prev = document.querySelector('#videoPrev'),
  next = document.querySelector('#videoNext'),
  sliderItems = document.querySelectorAll('.video-slider-item'),
  paginations = document.querySelectorAll('.video-slider-pagination-dot')

let slidesLength = sliderItems.length,
  slideGap = getComputedStyle(slider).columnGap.match(/\d+/)[0],
  slideSize = document.querySelector('.video-slider-item').offsetWidth,
  slideFullSize = slideSize + +slideGap,
  index = 0,
  allowShift = true,
  activeSlideNum = 1

console.log(slideFullSize)

sliderItems.forEach(item => {
  const clone = item.cloneNode(true)
  slider.appendChild(clone)
})

// slider.appendChild(cloneFirst)
// slider.insertBefore(cloneLast, firstSlide)

prev.addEventListener('click', () => shiftSlide())
next.addEventListener('click', () => shiftSlide())

// slider.addEventListener('transitionend', checkIndex)

// paginations.forEach(pag => {
//   pag.addEventListener('click', paginate)
// })

// function paginate() {
//   const slideNum = +this.dataset.slide
//   slider.classList.add('shifting')

//   if (slideNum === 5) {
//     index = 4
//   } else {
//     index = slideNum
//   }

//   slider.style.left = -slideSize * slideNum + 'px'

//   allowShift = false
//   activeSlideNum = slideNum

//   // dotActive()
// }

function shiftSlide() {
  if (!slider.classList.contains('shifting')) {
    const posInitial = slider.offsetLeft

    console.log(posInitial, 'pos')
    let cycle = false,
      delta = this.id === 'prev' ? -1 : 1

    slider.style.left = posInitial + -slideFullSize * delta + 'px'

    activeSlideNum += delta
    console.log(activeSlideNum, 'active')

    cycle = !!(activeSlideNum === 0 || activeSlideNum > slidesLength)

    if (cycle) {
      activeSlideNum = activeSlideNum === 0 ? slidesLength : 1
      slider.style.left = -slideFullSize * (activeSlideNum + 1) + 'px'
    }
  }
}

// function shiftSlide(dir) {
//   console.log(index)
//   slider.classList.add('shifting')

//   if (allowShift) {
//     posInitial = slider.offsetLeft

//     if (dir == 1) {
//       slider.style.left = posInitial - slideFullSize + 'px'
//       // slides.style.left = posInitial - slideSize + 'px'
//       index++
//       if (activeSlideNum !== 7) {
//         activeSlideNum++
//       } else {
//         activeSlideNum = 1
//       }
//     } else if (dir == -1) {
//       slider.style.left = posInitial + slideFullSize + 'px'
//       index--
//       if (activeSlideNum !== 7) {
//         activeSlideNum--
//       } else {
//         activeSlideNum = 5
//       }
//     }
//   }

//   allowShift = false

//   // dotActive()
// }

// function checkIndex() {
//   console.log('transitioned')

//   slider.classList.remove('shifting')

//   if (index == -1) {
//     slider.style.left = -(slidesLength * slideFullSize) + 'px'
//     index = slidesLength - 1
//   }

//   if (index == slidesLength) {
//     slider.style.left = -(1 * slideFullSize) + 'px'
//     index = 0
//   }

//   allowShift = true
// }

// function dotActive() {
//   paginations.forEach(dot => {
//     dot.classList.contains('active') ? dot.classList.remove('active') : ''
//   })

//   const active = document.querySelector(
//     `.welcome-slider-pagination-item[data-slide="${activeSlideNum}"]`
//   )
//   active.classList.add('active')
// }
