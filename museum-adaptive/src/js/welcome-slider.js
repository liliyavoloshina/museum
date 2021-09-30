import { tns } from 'tiny-slider/src/tiny-slider'

const slider2 = tns({
  container: '#welcomeSlider',
  loop: true,
  mouseDrag: true,
  speed: 2000,
  lazyload: true,
  navContainer: '#welcomePag',
  navAsThumbnails: true,
  prevButton: '#welcomePrev',
  nextButton: '#welcomeNext'
})

// const slider = document.querySelector('#welcomeSlider'),
//   sliderItems = document.querySelector('#welcomeSlides'),
//   prev = document.querySelector('#welcomePrev'),
//   next = document.querySelector('#welcomeNext'),
//   paginations = document.querySelectorAll('.welcome-slider-pagination-item'),
//   counterCurrent = document.querySelector('.welcome-slider-counter-first')

// const changeSize = () => {
//   slideSize = sliderItems.querySelector('.slide').offsetWidth
//   document.documentElement.style.setProperty(
//     '--scrollbar-width',
//     window.innerWidth - document.documentElement.clientWidth + 'px'
//   )
// }
// window.addEventListener('resize', changeSize)

// let posX1 = 0,
//   posX2 = 0,
//   posInitial,
//   posFinal,
//   threshold = 100,
//   slides = sliderItems.querySelectorAll('.slide'),
//   slidesLength = slides.length,
//   slideSize = sliderItems.querySelector('.slide').offsetWidth,
//   firstSlide = slides[0],
//   lastSlide = slides[slidesLength - 1],
//   cloneFirst = firstSlide.cloneNode(true),
//   cloneLast = lastSlide.cloneNode(true),
//   index = 0,
//   allowShift = true,
//   activeSlideNum = 1

// sliderItems.appendChild(cloneFirst)
// sliderItems.insertBefore(cloneLast, firstSlide)
// sliderItems.onmousedown = dragStart
// sliderItems.addEventListener('touchstart', dragStart)
// sliderItems.addEventListener('touchend', dragEnd)
// sliderItems.addEventListener('touchmove', dragAction)
// prev.addEventListener('click', () => shiftSlide(-1))
// next.addEventListener('click', () => shiftSlide(1))
// sliderItems.addEventListener('transitionend', checkIndex)
// paginations.forEach(pag => {
//   pag.addEventListener('click', paginate)
// })

// function paginate() {
//   const slideNum = +this.dataset.slide
//   sliderItems.classList.add('shifting')

//   if (slideNum === 5) {
//     index = 4
//   } else {
//     index = slideNum
//   }

//   sliderItems.style.left = -slideSize * slideNum + 'px'

//   allowShift = false
//   activeSlideNum = slideNum

//   dotActive()
//   counterActive()
// }

// function dragStart(e) {
//   e = e || window.event
//   e.preventDefault()
//   posInitial = sliderItems.offsetLeft

//   if (e.type == 'touchstart') {
//     posX1 = e.touches[0].clientX
//   } else {
//     posX1 = e.clientX
//     document.onmouseup = dragEnd
//     document.onmousemove = dragAction
//   }
// }

// function dragAction(e) {
//   e = e || window.event

//   if (e.type == 'touchmove') {
//     posX2 = posX1 - e.touches[0].clientX
//     posX1 = e.touches[0].clientX
//   } else {
//     posX2 = posX1 - e.clientX
//     posX1 = e.clientX
//   }
//   sliderItems.style.left = sliderItems.offsetLeft - posX2 + 'px'
// }

// function dragEnd(e) {
//   posFinal = sliderItems.offsetLeft
//   if (posFinal - posInitial < -threshold) {
//     shiftSlide(1, 'drag')
//   } else if (posFinal - posInitial > threshold) {
//     shiftSlide(-1, 'drag')
//   } else {
//     sliderItems.style.left = posInitial + 'px'
//   }

//   document.onmouseup = null
//   document.onmousemove = null
// }

// function shiftSlide(dir, action) {
//   sliderItems.classList.add('shifting')

//   if (allowShift) {
//     if (!action) {
//       posInitial = sliderItems.offsetLeft
//     }

//     if (dir == 1) {
//       sliderItems.style.left = posInitial - slideSize + 'px'
//       index++
//       if (activeSlideNum !== 5) {
//         activeSlideNum++
//       } else {
//         activeSlideNum = 1
//       }
//     } else if (dir == -1) {
//       sliderItems.style.left = posInitial + slideSize + 'px'
//       index--
//       if (activeSlideNum !== 1) {
//         activeSlideNum--
//       } else {
//         activeSlideNum = 5
//       }
//     }
//   }

//   allowShift = false
//   dotActive()
//   counterActive()
// }

// function checkIndex() {
//   sliderItems.classList.remove('shifting')

//   if (index == -1) {
//     sliderItems.style.left = -(slidesLength * slideSize) + 'px'
//     index = slidesLength - 1
//   }

//   if (index == slidesLength) {
//     sliderItems.style.left = -(1 * slideSize) + 'px'
//     index = 0
//   }

//   allowShift = true
// }

// function dotActive() {
//   paginations.forEach(dot => {
//     dot.classList.contains('active') ? dot.classList.remove('active') : ''
//   })

//   const active = document.querySelector(`.welcome-slider-pagination-item[data-slide="${activeSlideNum}"]`)
//   active.classList.add('active')
// }

// function counterActive() {
//   counterCurrent.textContent = `0${activeSlideNum}`
// }
