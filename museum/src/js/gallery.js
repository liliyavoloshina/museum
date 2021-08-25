const gallery = document.querySelector('.gallery-container')

const sources = [
  '../img/gallery/galery1.jpg',
  '../img/gallery/galery2.jpg',
  '../img/gallery/galery3.jpg',
  '../img/gallery/galery4.jpg',
  '../img/gallery/galery5.jpg',
  '../img/gallery/galery6.jpg',
  '../img/gallery/galery7.jpg',
  '../img/gallery/galery8.jpg',
  '../img/gallery/galery9.jpg',
  '../img/gallery/galery10.jpg',
  '../img/gallery/galery11.jpg',
  '../img/gallery/galery12.jpg',
  '../img/gallery/galery13.jpg',
  '../img/gallery/galery14.jpg',
  '../img/gallery/galery15.jpg'
]

shuffle(sources)

sources.map(pic => {
  const img = document.createElement('img')
  img.classList.add('gallery-picture')
  img.src = pic
  img.alt = 'Gallery Picture'
  // gallery.innerHTML = img
  gallery.append(img)
  // console.log(img)
})

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}
