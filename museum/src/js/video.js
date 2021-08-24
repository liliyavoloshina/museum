const currentVideo = document.querySelector('#currentVideo')
  const currentSource = document.querySelector('#currentSource')

  const videoCurrentMainBtn = document.querySelector('#videoCurrentMainBtn')
  const videoCurrentSmallBtn = document.querySelector('#videoCurrentSmallBtn')

  const videoRangeProgress = document.querySelector('#video-range-progress')
  const videoRangeVolume = document.querySelector('#video-range-volume')

  let currentVideoSrc = './video/video0.mp4'
  // let currentVideoDuration = +currentVideo.duration
  let currentVideoDuration

  currentSource.setAttribute('src', currentVideoSrc)
  // console.log(currentVideoDuration)
  // currentVideo.setAttribute('max', Math.floor(currentVideo.duration))
  currentVideo.load()


  // videoRangeProgress.max

  currentVideo.addEventListener('click', togglePlayBtn)
  videoCurrentMainBtn.addEventListener('click', togglePlayBtn)
  videoCurrentSmallBtn.addEventListener('click', togglePlayBtn)

  videoRangeProgress.addEventListener('input', handleInputChange)
  videoRangeProgress.addEventListener('input', handleProgress)
  videoRangeVolume.addEventListener('input', handleInputChange)

  currentVideo.addEventListener('timeupdate', watchProgess)

  function handleInputChange(e) {
    const value = e.target.value
    this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`
  }

  function togglePlayBtn() {
    if (currentVideo.paused) {
      currentVideo.play()
      videoCurrentMainBtn.classList.add('hidden')
      videoCurrentSmallBtn.classList.add('paused')
    } else {
      currentVideo.pause()
      videoCurrentMainBtn.classList.remove('hidden')
      videoCurrentSmallBtn.classList.remove('paused')
    }
  }

  function handleProgress() {
    const newTime = (this.value / 100) * currentVideo.duration
    currentVideo.currentTime = newTime
    currentVideo.play()
  }

  function watchProgess() {
    const newValue = Math.round(100 / this.duration * this.currentTime)
    videoRangeProgress.value = newValue
    videoRangeProgress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${newValue}%, #c4c4c4 ${newValue}%, #c4c4c4 100%)`

    if (this.currentTime === this.duration) {
      videoCurrentMainBtn.classList.remove('hidden')
      videoCurrentSmallBtn.classList.remove('paused')
    }
  }
