const headerBtn = document.querySelector('#headerBtn'),
headerNav = document.querySelector('#headerNav')

headerBtn.addEventListener('click', toggleHeader)

function toggleHeader() {
  changeImage()
  toggleNav()
  document.body.style.backgroundColor = "red"
}

function changeImage() {
  headerBtn.classList.toggle('opened')
}

function toggleNav() {
  headerNav.classList.toggle('opened')
}