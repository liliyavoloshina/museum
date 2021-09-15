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

document.addEventListener('click', function(event) {
  if (
    headerNav.classList.contains('opened') &&
    !event.target.closest('#headerBtn') && event.target !== headerNav
  ) {
    headerBtn.classList.remove('opened')
    headerNav.classList.remove('opened')
  }
})