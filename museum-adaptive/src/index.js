import './scss/style.scss'
import './js/header'
import './js/welcome-slider'
import './js/explore-slider'
import './js/video'
import './js/gallery'
import './js/popup'
import './js/styling'
import './js/modernizr'

Modernizr.on('webp', function (result) {
    // `result == Modernizr.webp`
    console.log(result);  // either `true` or `false`
    if (result) {
      // Has WebP support
    }
    else {
      // No WebP support
    }
  })

document.documentElement.style.setProperty(
  '--scrollbar-width',
  window.innerWidth - document.documentElement.clientWidth + 'px'
)
