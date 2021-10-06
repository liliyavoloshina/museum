import { stopIframes, pauseVideo } from './video'

function loadPlayer() {
  if (typeof YT == 'undefined' || typeof YT.Player == 'undefined') {
    var tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    var firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

    // window.onYouTubePlayerAPIReady = function() {
    //   onYouTubeIframeAPIReady()
    // }
  }
}

var playerInfoList = [
  { id: 'player', height: '390', width: '640', videoId: 'aWmJ5DgyWPI' },
  { id: 'player2', height: '390', width: '640', videoId: 'Vi5D6FKhRmo' }
]

// function onYouTubeIframeAPIReady() {
//   for (var i = 0; i < playerInfoList.length; i++) {
//     createPlayer(playerInfoList[i])
//   }
// }
function createPlayer(playerInfo) {
  return new YT.Player(playerInfo.id, {
    height: playerInfo.height,
    width: playerInfo.width,
    videoId: playerInfo.videoId,
    events: {
      onStateChange: onPlayerStateChange
    }
  })
}

loadPlayer()

function findVideos() {
  // const videos = document.querySelectorAll('.video-slider-item')
  const videos = document.querySelectorAll('.video-slider-item__wrapper')
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


    createPlayer({ id: 'player', height: '390', width: '640', videoId: 'aWmJ5DgyWPI' })
    loadPlayer()


  })

  link.removeAttribute('href')
  video.classList.add('video-slider-item--enabled')
}

function onPlayerStateChange(event) {
  console.log(event)
  if (event.data == YT.PlayerState.PAUSED) {
    console.log('Paused')
  }

  if (event.data == YT.PlayerState.PLAYING) {
    console.log('Playing')
  }

  if (event.data == YT.PlayerState.ENDED) {
    end()
  }
}

function createIframe(id) {
  let iframe = document.createElement('iframe')
  iframe.setAttribute('allowfullscreen', '')
  iframe.setAttribute('allow', 'autoplay')
  iframe.setAttribute('src', generateURL(id))
  iframe.id = id
  iframe.classList.add('video-slider-item__media')

  return iframe
}

function generateURL(id) {
  let query = '?rel=0&autoplay=1&enablejsapi=1'
  // let query = '?rel=0&showinfo=0&autoplay=1&enablejsapi=1&version=3'

  return `https://www.youtube.com/embed/${id}${query}`
}

findVideos()

export { isIframePlaying }
