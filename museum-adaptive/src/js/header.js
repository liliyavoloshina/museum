const headerBtn = document.querySelector('#headerBtn'),
headerNav = document.querySelector('#headerNav'),
overlayNav = document.querySelector('#overlayNav')

headerBtn.addEventListener('click', toggleHeader)
overlayNav.addEventListener('click', toggleHeader)

function toggleHeader() {
  changeImage()
  toggleNav()
}

function changeImage() {
  headerBtn.classList.toggle('opened')
}

function toggleNav() {
  headerNav.classList.toggle('opened')
  overlayNav.classList.toggle('opened')
}