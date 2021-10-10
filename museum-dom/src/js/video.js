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

let videoSources = {
  1: {
    src: './video/video0.mp4',
    poster: './img/video/poster0.webp'
  },
  2: {
    src: './video/video1.mp4',
    poster: './img/video/poster1.webp'
  },
  3: {
    src: './video/video2.mp4',
    poster: './img/video/poster2.webp'
  },
  4: {
    src: './video/video3.mp4',
    poster: './img/video/poster3.webp'
  },
  5: {
    src: './video/video4.mp4',
    poster: './img/video/poster4.webp'
  }
}

let videoPlaying = false
let videoVolume = 0.5
let videoSpeed = video.playbackRate
let fullscreenMode = false

setVideo()
video.volume = videoVolume

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
  if (!isInViewport(video)) {
    return
  }

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

function isInViewport(element) {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

function setVideo(index = 1) {
  const videoSrc = videoSources[index].src
  const videoPoster = videoSources[index].poster
  videoSource.setAttribute('src', videoSrc)
  video.setAttribute('poster', videoPoster)
  videoVolume = 0.5
  videoSpeed = 1
  pauseVideo()
  videoProgress.value = 0
  changeProgressBar(0)
  unmuteVideo()
  video.load()
}

function changeVideo(currentIndex) {
  setVideo(currentIndex)
  stopIframes()
}

function playVideo() {
  video.play()
  videoPlaying = true
  videoLargePlay.classList.add('hidden')
  videoSmallPlay.classList.add('paused')
}

function pauseVideo() {
  video.pause()
  videoPlaying = false
  videoLargePlay.classList.remove('hidden')
  videoSmallPlay.classList.remove('paused')
}

function togglePlay() {
  if (video.paused) {
    stopIframes()
    playVideo()
  } else {
    pauseVideo()
  }
}

function changeProgressBar(value) {
  videoProgress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`
}

function changeVolumeBar(value) {
  videoVolumeRange.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`
}

function stopIframes() {
  const iframes = document.querySelectorAll('iframe')
  iframes.forEach(iframe => {
    iframe.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*')
  })
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

function muteVideo() {
  video.muted = true
  videoVolumeBtn.classList.add('muted')
  videoVolumeRange.value = 0
  changeVolumeBar(0)
}

function unmuteVideo() {
  video.muted = false
  video.volume = videoVolume
  videoVolumeBtn.classList.remove('muted')
  videoVolumeRange.value = video.volume
  changeVolumeBar(videoVolume * 100)
}

function toggleMute() {
  if (video.muted) {
    unmuteVideo()
  } else {
    muteVideo()
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

function togglePopup() {
  videoInfoPopup.textContent = `${videoSpeed}x`
  videoInfoPopup.classList.toggle('show')

  setTimeout(() => {
    videoInfoPopup.classList.remove('show')
  }, 500)
}

export { pauseVideo, videoPlaying, changeVideo }
