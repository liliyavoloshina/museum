const currentVideo = document.querySelector('#currentVideo')
const currentSource = document.querySelector('#currentSource')
const currentVideoBigPlay = document.querySelector('#currentVideoBigPlay')
const currentVideoSmallPlay = document.querySelector('#currentVideoSmallPlay')
const currentVideoProgress = document.querySelector('#currentVideoProgress')
const currentVideoVolumeRange = document.querySelector('#currentVideoVolumeRange')
const currentVideoVolumeBtn = document.querySelector('#currentVideoVolumeBtn')

let currentVideoSrc = './video/video0.mp4'
currentSource.setAttribute('src', currentVideoSrc)
currentVideo.load()
currentVideo.volume = 0.5

currentVideo.addEventListener('click', togglePlayBtn)
currentVideoBigPlay.addEventListener('click', togglePlayBtn)
currentVideoSmallPlay.addEventListener('click', togglePlayBtn)
currentVideoVolumeBtn.addEventListener('click', toggleVolumeBtn)
currentVideoVolumeRange.addEventListener('input', handleVolume)
currentVideoProgress.addEventListener('input', handleProgress)

currentVideo.addEventListener('timeupdate', watchProgess)


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
  const newValue = Math.round((100 / this.duration) * this.currentTime)
  currentVideoProgress.value = newValue
  currentVideoProgress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${newValue}%, #c4c4c4 ${newValue}%, #c4c4c4 100%)`

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
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value * 100}%, #c4c4c4 ${value * 100}%, #c4c4c4 100%)`

  if (currentVideo.volume === 0) {
    currentVideo.muted = true
    currentVideoVolumeBtn.classList.add('muted')
  }
}
