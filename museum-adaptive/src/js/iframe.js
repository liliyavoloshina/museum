import { stopIframes, pauseVideo, videoPlaying } from './video'

let playerCurrentlyPlaying = false
// let isSomethingPlaying = (videoPlaying === true || playerCurrentlyPlaying === true) ? true : false
// let isSomethingPlaying = (videoPlaying === true || playerCurrentlyPlaying === true) ? true : false

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

const videoList = ['aWmJ5DgyWPI', 'Vi5D6FKhRmo', 'NOhDysLnTvY', 'aWmJ5DgyWPI', 'zp1BXPX8jcU']

function onYouTubeIframeAPIReady() {
  videoList.forEach(video => {
    createPlayer(video)
  })
}

function createPlayer(id) {
  return new YT.Player(id, {
    height: '390',
    width: '640',
    videoId: id,
    events: {
      onStateChange: function onPlayerStateChange(event) {
        // console.log(isSomethingPlaying, 'somethinf')
        console.log(playerCurrentlyPlaying, 'playerCurrentlyPlaying')
        // if (event.data == YT.PlayerState.PAUSED) {
        //   console.log('Paused')
        // }
      
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



loadPlayer()

// isIframePlaying = true
// {
//   if (playerCurrentlyPlaying != null && playerCurrentlyPlaying != player_id)
//     callPlayer(playerCurrentlyPlaying, 'pauseVideo')
//   playerCurrentlyPlaying = player_id
// }

// if (event.data == YT.PlayerState.ENDED) {
//   end()
// }
