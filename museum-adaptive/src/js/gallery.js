const gallery = document.querySelector('.gallery-container')

let sources = []

const isWebpSupport = checkWebpSupport()

getSources()
shuffle(sources)
insertImages(sources)

function checkWebpSupport() {
  const canvas = document.createElement('canvas')
  if (!!(canvas.getContext && canvas.getContext('2d'))) {
    // was able or not to get WebP representation
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') == 0
  } else {
    // very old browser like IE 8, canvas not supported
    return false
  }
}

function getSources() {
  if (isWebpSupport) {
    for (let i = 1; i < 16; i++) {
      sources.push(`./img/gallery/galery${i}.webp`)
    }
  } else {
    for (let i = 1; i < 16; i++) {
      sources.push(`./img/gallery/galery${i}.jpg`)
    }
  }
}

function insertImages(sources) {
  sources.map(pic => {
    const imgWrapper = document.createElement('div')
    imgWrapper.classList.add('gallery-wrapper')

    const img = document.createElement('img')
    img.classList.add('gallery-picture')
    img.src = pic
    img.alt = 'Gallery Picture'
    gallery.append(imgWrapper)
    imgWrapper.append(img)

    img.onload = function() {
      const height = this.height

      if (height >= 570) {
        imgWrapper.classList.add('long')
      } else if (height >= 456 && height < 570) {
        imgWrapper.classList.add('medium')
      } else if (height < 456) {
        imgWrapper.classList.add('short')
      }
    }
  })
}

function shuffle(array) {
  console.log(sources)
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

const pictures = document.querySelectorAll('.gallery-wrapper')
let isScrolling = false

document.addEventListener('DOMContentLoaded', scrolling)
window.addEventListener('scroll', throttleScroll, false)

function throttleScroll(e) {
  if (isScrolling == false) {
    window.requestAnimationFrame(function() {
      scrolling(e)
      isScrolling = false
    })
  }
  isScrolling = true
}

function scrolling() {
  pictures.forEach(pic => {
    if (isPartiallyVisible(pic)) {
      pic.classList.add('active')
    } else {
      pic.classList.remove('active')
    }
  })
}

function isPartiallyVisible(el) {
  const elementBoundary = el.getBoundingClientRect()

  const top = elementBoundary.top
  const bottom = elementBoundary.bottom
  const height = elementBoundary.height

  return top + height >= 0 && height + window.innerHeight >= bottom
}
