const slider = document.querySelector('#welcomeSlider'),
  sliderItems = document.querySelector('#welcomeSlides'),
  prev = document.querySelector('#welcomePrev'),
  next = document.querySelector('#welcomeNext'),
  paginations = document.querySelectorAll('.welcome-slider-pagination-item'),
  counterCurrent = document.querySelector('.welcome-slider-counter-first')

slide(sliderItems, prev, next, paginations)

function slide(items, prev, next, paginations) {
  let posX1 = 0,
    posX2 = 0,
    posInitial,
    posFinal,
    threshold = 100,
    slides = items.querySelectorAll('.slide'),
    slidesLength = slides.length,
    slideSize = items.querySelector('.slide').offsetWidth,
    firstSlide = slides[0],
    lastSlide = slides[slidesLength - 1],
    cloneFirst = firstSlide.cloneNode(true),
    cloneLast = lastSlide.cloneNode(true),
    index = 0,
    allowShift = true,
    activeSlideNum = 1
  items.appendChild(cloneFirst)
  items.insertBefore(cloneLast, firstSlide)
  items.onmousedown = dragStart
  items.addEventListener('touchstart', dragStart)
  items.addEventListener('touchend', dragEnd)
  items.addEventListener('touchmove', dragAction)
  prev.addEventListener('click', () => shiftSlide(-1))
  next.addEventListener('click', () => shiftSlide(1))
  items.addEventListener('transitionend', checkIndex)
  paginations.forEach(pag => {
    pag.addEventListener('click', paginate)
  })

  console.log(index)

  function paginate() {
    const slideNum = +this.dataset.slide
    items.classList.add('shifting')

    if (slideNum === 5) {
      index = 4
    } else {
      index = slideNum
    }
    // if (slideNum > index) {
    //   index++
    // } else {
    //   index--
    // }

    console.log(index, 'index')
    console.log(slideNum, 'slideNum')
    items.style.left = -slideSize * slideNum + 'px'

    allowShift = false
    activeSlideNum = slideNum

    dotActive()
    counterActive()
  }

  function dragStart(e) {
    e = e || window.event
    e.preventDefault()
    posInitial = items.offsetLeft

    if (e.type == 'touchstart') {
      posX1 = e.touches[0].clientX
    } else {
      posX1 = e.clientX
      document.onmouseup = dragEnd
      document.onmousemove = dragAction
    }
  }

  function dragAction(e) {
    e = e || window.event

    if (e.type == 'touchmove') {
      posX2 = posX1 - e.touches[0].clientX
      posX1 = e.touches[0].clientX
    } else {
      posX2 = posX1 - e.clientX
      posX1 = e.clientX
    }
    items.style.left = items.offsetLeft - posX2 + 'px'
  }

  function dragEnd(e) {
    posFinal = items.offsetLeft
    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, 'drag')
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, 'drag')
    } else {
      items.style.left = posInitial + 'px'
    }

    document.onmouseup = null
    document.onmousemove = null
  }

  function shiftSlide(dir, action) {
    items.classList.add('shifting')

    if (allowShift) {
      if (!action) {
        posInitial = items.offsetLeft
      }

      if (dir == 1) {
        items.style.left = posInitial - slideSize + 'px'
        index++
        if (activeSlideNum !== 5) {
          activeSlideNum++
        } else {
          activeSlideNum = 1
        }
      } else if (dir == -1) {
        items.style.left = posInitial + slideSize + 'px'
        index--
        if (activeSlideNum !== 1) {
          activeSlideNum--
        } else {
          activeSlideNum = 5
        }
      }
    }

    allowShift = false
    dotActive()
    counterActive()
  }

  function checkIndex() {
    items.classList.remove('shifting')

    if (index == -1) {
      items.style.left = -(slidesLength * slideSize) + 'px'
      index = slidesLength - 1
    }

    if (index == slidesLength) {
      items.style.left = -(1 * slideSize) + 'px'
      index = 0
    }

    allowShift = true
  }

  function dotActive() {
    paginations.forEach(dot => {
      dot.classList.contains('active') ? dot.classList.remove('active') : ''
    })

    const active = document.querySelector(
      `.welcome-slider-pagination-item[data-slide="${activeSlideNum}"]`
    )
    active.classList.add('active')
  }

  function counterActive() {
    counterCurrent.textContent = `0${activeSlideNum}`
  }
}
