import { pauseVideo, videoPlaying, initSlider } from './video'

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

const slides = document.querySelectorAll('.video-slider-item')


function onYouTubeIframeAPIReady() {
  slides.forEach(slide => {
    createPlayer(slide.dataset)
  })
}

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
      origin: 'https://localhost:8080'
    },
    events: {
      onStateChange: event => onPlayerStateChange(event, number)
    }
  })
}

function onPlayerStateChange(event, number) {
  console.log('onPlayerStateChange')
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

loadPlayer()
