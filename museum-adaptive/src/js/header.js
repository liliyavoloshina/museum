const headerBtn = document.querySelector('#headerBtn'),
headerNav = document.querySelector('#headerNav'),
welcomeText = document.querySelector('.welcome__text')

headerBtn.addEventListener('click', toggleHeader)

function toggleHeader() {
  changeImage()
  toggleNav()
  welcomeText.classList.toggle('hidden')
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
    !event.target.closest('#headerBtn') && !event.target.closest('#headerNav') || event.target.closest('.nav__item')
  ) {
    headerBtn.classList.remove('opened')
    headerNav.classList.remove('opened')
    welcomeText.classList.toggle('hidden')
  }
})