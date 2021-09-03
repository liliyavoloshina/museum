const headerBtn = document.querySelector('#headerBtn'),
headerNav = document.querySelector('#headerNav')

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
}