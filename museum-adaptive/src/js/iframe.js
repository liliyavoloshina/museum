function findVideos() {
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
    let iframe = createIframe(id)

    link.remove()
    button.remove()
    video.appendChild(iframe)
  })

  link.removeAttribute('href')
  video.classList.add('video-slider-item--enabled')
}

function createIframe(id) {
  let iframe = document.createElement('iframe')

  iframe.setAttribute('allowfullscreen', '')
  iframe.setAttribute('allow', 'autoplay')
  iframe.setAttribute('src', generateURL(id))
  iframe.classList.add('video-slider-item__media')

  return iframe
}

function generateURL(id) {
  let query = '?rel=0&showinfo=0&autoplay=1'

  return 'https://www.youtube.com/embed/' + id + query
}

findVideos()
