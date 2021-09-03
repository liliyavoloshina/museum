const buttons = document.querySelectorAll('.ripple')

buttons.forEach(button => {
  button.addEventListener('click', function (e) {
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
