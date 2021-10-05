import { tns } from 'tiny-slider/src/tiny-slider'

const video = document.querySelector('#video')
const videoSource = document.querySelector('#videoSource')
const videoLargePlay = document.querySelector('#videoLargePlay')
const videoSmallPlay = document.querySelector('#videoSmallPlay')
const videoProgress = document.querySelector('#videoProgress')
const videoVolumeRange = document.querySelector('#videoVolumeRange')
const videoVolumeBtn = document.querySelector('#videoVolumeBtn')
const videoFullscreenBtn = document.querySelector('#videoFullscreenBtn')
const fullscreenWrapper = document.querySelector('#fullscreenWrapper')
const videoInfoPopup = document.querySelector('#videoInfoPopup')

let videoSrc = './video/video0.mp4'
let videoVolume = 0.5
let videoSpeed = video.playbackRate
videoSource.setAttribute('src', videoSrc)
video.load()
video.volume = videoVolume

let fullscreenMode = false

video.addEventListener('click', togglePlay)
videoLargePlay.addEventListener('click', togglePlay)
videoSmallPlay.addEventListener('click', togglePlay)
videoVolumeBtn.addEventListener('click', toggleMute)
videoVolumeRange.addEventListener('input', handleVolume)
videoProgress.addEventListener('input', handleProgress)
videoProgress.addEventListener('click', handleProgress)
videoFullscreenBtn.addEventListener('click', toggleFullscreen)
video.addEventListener('timeupdate', watchProgess)

document.addEventListener('fullscreenchange', watchFullscreen)
document.addEventListener('keydown', e => {
  if (e.code === 'Space') {
    e.preventDefault()
    togglePlay()
  }

  if (e.code === 'KeyM') {
    toggleMute()
  }

  if (e.code === 'KeyF') {
    toggleFullscreen()
  }

  if (e.shiftKey) {
    if (e.code === 'Period') {
      increaseSpeed()
    }
    if (e.code === 'Comma') {
      decreaseSpeed()
    }
  }
})

function togglePopup() {
  videoInfoPopup.textContent = `${videoSpeed}x`
  videoInfoPopup.classList.toggle('show')

  setTimeout(() => {
    videoInfoPopup.classList.remove('show')
  }, 500)
}

function togglePlay() {
  if (video.paused) {
    video.play()
    videoLargePlay.classList.add('hidden')
    videoSmallPlay.classList.add('paused')
  } else {
    video.pause()
    videoLargePlay.classList.remove('hidden')
    videoSmallPlay.classList.remove('paused')
  }
}

function changeProgressBar(value) {
  videoProgress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`
}

function handleProgress() {
  const newTime = (this.value / 100) * video.duration
  const newValue = Math.round((100 / video.duration) * video.currentTime)
  video.currentTime = newTime
  changeProgressBar(newValue)
}

function watchProgess() {
  if (!video.paused) {
    const newValue = Math.round((100 / this.duration) * this.currentTime)
    videoProgress.value = newValue
    changeProgressBar(newValue)
  }

  if (this.currentTime === this.duration) {
    videoLargePlay.classList.remove('hidden')
    videoSmallPlay.classList.remove('paused')
  }
}

function toggleMute() {
  if (video.muted) {
    video.muted = false
    video.volume = videoVolume
    videoVolumeBtn.classList.remove('muted')
    videoVolumeRange.value = video.volume
    videoVolumeRange.style.background = `linear-gradient(to right, #710707 0%, #710707 ${videoVolume *
      100}%, #c4c4c4 ${videoVolume * 100}%, #c4c4c4 100%)`
  } else {
    video.muted = true
    videoVolumeBtn.classList.add('muted')
    videoVolumeRange.value = 0
    videoVolumeRange.style.background = `linear-gradient(to right, #710707 0%, #710707 0%, #c4c4c4 0%, #c4c4c4 100%)`
  }
}

function handleVolume() {
  const value = this.value
  videoVolume = value
  video.volume = videoVolume
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value * 100}%, #c4c4c4 ${value *
    100}%, #c4c4c4 100%)`

  if (value > 0) {
    video.muted = false
    videoVolumeBtn.classList.remove('muted')
  }

  if (value == 0) {
    video.muted = true
    videoVolumeBtn.classList.add('muted')
  }
}

function increaseSpeed() {
  videoSpeed !== 2 ? (videoSpeed += 0.25) : 2
  video.playbackRate = videoSpeed
  togglePopup()
}

function decreaseSpeed() {
  videoSpeed !== 0.25 ? (videoSpeed -= 0.25) : 0.25
  video.playbackRate = videoSpeed
  togglePopup()
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
    videoFullscreenBtn.classList.remove('exit')
  } else {
    fullscreenWrapper.classList.add('expanded')
    fullscreenMode = true
    videoFullscreenBtn.classList.add('exit')
  }
}

const slider = tns({
  container: '.video-slider',
  loop: true,
  responsive: {
    '1024': {
      items: 3,
      gutter: 42
    },
    '768': {
      items: 2,
      gutter: 20
    },
    '420': {
      items: 2,
      gutter: 20
    }
  },
  preventActionWhenRunning: true,
  lazyload: true,
  speed: 900,
  navContainer: '.video-nav',
  navAsThumbnails: true,
  prevButton: '#videoPrev',
  nextButton: '#videoNext'
})
