import { tns } from 'tiny-slider/src/tiny-slider'
import { pauseVideo, videoPlaying, changeVideo } from './video'

let slider

initSlider()

slider.events.on('transitionStart', () => changeVideo(slider.getInfo().displayIndex))

const slides = document.querySelectorAll('.video-slider-item')

function loadPlayer() {
  var tag = document.createElement('script')
  tag.src = 'https://www.youtube.com/iframe_api'
  var firstScriptTag = document.getElementsByTagName('script')[0]
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

  window.onYouTubePlayerAPIReady = function() {
    convertId()
    onYouTubeIframeAPIReady()
  }
}

function onYouTubeIframeAPIReady() {
  slides.forEach(slide => {
    createPlayer(slide.dataset)
  })
}

// function that add additional dataset attr to iframes
function convertId() {
  const dataset = []

  slides.forEach(slide => {
    let id = slide.dataset.id

    let count = 0
    if (dataset.includes(id)) {
      dataset.forEach(duplicate => {
        if (duplicate === id || duplicate === `${id}-${count}`) {
          count++
        }
      })
    }

    slide.dataset.id = id
    slide.dataset.number = `${id}-${count}`
    dataset.push(id)
  })
}

function createPlayer(data) {
  const number = data.number
  const id = data.id
  return new YT.Player(document.querySelector(`[data-number="${number}"]`), {
    height: '390',
    width: '640',
    videoId: id,
    playerVars: {
      id: number,
      origin: 'https://rolling-scopes-school.github.io/liliyavoloshina-JSFE2021Q3/museum-dom/'
    },
    events: {
      onStateChange: event => onPlayerStateChange(event, number)
    }
  })
}

function onPlayerStateChange(event, number) {
  const iframes = document.querySelectorAll('iframe')
  if (event.data == YT.PlayerState.PLAYING) {
    if (videoPlaying) {
      pauseVideo()
    }

    iframes.forEach(iframe => {
      if (iframe.dataset.number !== number) {
        iframe.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*')
      }
    })
  }
}

function initSlider() {
  slider = tns({
    container: '#videoSlider',
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
}

loadPlayer()
