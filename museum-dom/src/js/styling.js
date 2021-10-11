const buttons = document.querySelectorAll('.ripple'),
inputFocusable = document.querySelectorAll('.input')

inputFocusable.forEach(input => {
  input.addEventListener('focus', () => {
    const parent = input.parentNode
    parent.classList.add('active')
  })
  input.addEventListener('blur', () => {
    const parent = input.parentNode
    parent.classList.remove('active')
  })
})

buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    const target = e.target

    // Get the bounding rectangle of target
    const rect = target.getBoundingClientRect()

    // Mouse position - element position
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const circle = document.createElement('span')
    circle.classList.add('circle')
    circle.style.top = y + 'px'
    circle.style.left = x + 'px'

    this.appendChild(circle)

    setTimeout(() => circle.remove(), 500)
  })
})

let header = document.querySelector('#header'),
  headerHeight = header.offsetHeight,
  prevScrollpos = window.pageYOffset

window.addEventListener('scroll', watchScroll)

function watchScroll() {
  var currentScrollPos = window.pageYOffset
  if (prevScrollpos > currentScrollPos) {
    header.style.top = '0'
  } else {
    header.style.top = `-${headerHeight}px`
  }
  prevScrollpos = currentScrollPos
}
