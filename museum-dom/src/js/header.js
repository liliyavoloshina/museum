const headerBtn = document.querySelector('#headerBtn'),
  headerNav = document.querySelector('#headerNav'),
  welcomeText = document.querySelector('.welcome__text')

headerBtn.addEventListener('click', toggleHeader)

function toggleHeader() {
  changeImage()
  toggleNav()
}

function changeImage() {
  headerBtn.classList.toggle('opened')
}

function toggleNav() {
  headerNav.classList.toggle('opened')

  if (window.matchMedia('(max-width: 1024px)').matches) {
    welcomeText.classList.toggle('hidden')
  }
}

document.addEventListener('click', function(event) {
  if (
    (headerNav.classList.contains('opened') &&
      !event.target.closest('#headerBtn') &&
      !event.target.closest('#headerNav')) ||
    event.target.closest('.nav__item')
  ) {
    toggleHeader()
  }
})
