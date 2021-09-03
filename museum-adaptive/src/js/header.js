const headerBtn = document.querySelector('#headerBtn')

headerBtn.addEventListener('click', toggleHeader)

function toggleHeader() {
  changeImage()
}

function changeImage() {
  headerBtn.classList.toggle('opened')
}