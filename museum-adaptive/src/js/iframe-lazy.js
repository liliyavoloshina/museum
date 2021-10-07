import { stopIframes, pauseVideo } from './video'

function loadPlayer() {
  if (typeof YT == 'undefined' || typeof YT.Player == 'undefined') {
    var tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    var firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

    window.onYouTubePlayerAPIReady = function() {
      onYouTubeIframeAPIReady()
    }
  }
}

const videoList = ['2OR0OCr6uRE', 'Vi5D6FKhRmo', 'NOhDysLnTvY', 'aWmJ5DgyWPI', 'zp1BXPX8jcU']

function onYouTubeIframeAPIReady() {
  videoList.forEach(video => {
    createPlayer(video)
  })
}

loadPlayer()

function findVideos() {
  const videos = document.querySelectorAll('.video-slider-item')
  for (let i = 0; i < videos.length; i++) {
    setupVideo(videos[i])
  }
}

function setupVideo(video) {
  let link = video.querySelector('.video-slider-item__link')
  let button = video.querySelector('.video-slider-item__button-play')
  let id = link.dataset.id

  video.addEventListener('click', () => {
    // let iframe = createIframe(id)

    link.remove()
    button.remove()
    // video.appendChild(iframe)
    // createPlayer(id)
  })

  link.removeAttribute('href')
  video.classList.add('video-slider-item--enabled')
}


// function createIframe(id) {
//   let iframe = document.createElement('iframe')
//   iframe.setAttribute('allowfullscreen', '')
//   iframe.setAttribute('allow', 'autoplay')
//   iframe.setAttribute('src', generateURL(id))
//   iframe.id = id
//   iframe.classList.add('video-slider-item__media')

//   return iframe
// }

function createPlayer(id) {
  console.log('createPlayer', id)
  return new YT.Player(id, {
    height: '390',
    width: '640',
    videoId: id,
    playerVars: {
      origin: 'https://localhost:8080'
    },
    events: {
      onStateChange: function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING) {
          if (videoPlaying) {
            pauseVideo()
          }
          const iframes = document.querySelectorAll('iframe')

          iframes.forEach(iframe => {
            if (iframe.id !== id) {
              iframe.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*')
            }
          })
        }
      }
    }
  })
}

function generateURL(id) {
  let query = '?rel=0&autoplay=1&enablejsapi=1'

  return `https://www.youtube.com/embed/${id}${query}`
}

// findVideos()

export { isIframePlaying }
