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
      onStateChange: onPlayerStateChange
    }
  })
}

loadPlayer()

function onPlayerStateChange(newState) {
  // console.log(isSomethingPlaying, 'somethinf')
  console.log(playerCurrentlyPlaying, 'playerCurrentlyPlaying')
  // if (event.data == YT.PlayerState.PAUSED) {
  //   console.log('Paused')
  // }

  if (newState.data == 1) {
    heap.track('Video Playing')
  } else if (newState.data == 0) {
    heap.track('Video Finished')
  } else if (newState.data == 2) {
    heap.track('Video Paused')
  }

  // if (event.data == YT.PlayerState.PLAYING) {
  //   if (videoPlaying) {
  //     pauseVideo()
  //   }
  //   if (playerCurrentlyPlaying) {
  //     stopIframes()
  //     playerCurrentlyPlaying = true
  //     player.playVideo()
  //   }
  // }
  // isIframePlaying = true
  // {
  //   if (playerCurrentlyPlaying != null && playerCurrentlyPlaying != player_id)
  //     callPlayer(playerCurrentlyPlaying, 'pauseVideo')
  //   playerCurrentlyPlaying = player_id
  // }

  // if (event.data == YT.PlayerState.ENDED) {
  //   end()
  // }
}
