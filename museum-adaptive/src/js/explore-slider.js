const exploreRange = document.querySelector('#exploreRange')
const after = document.querySelector('#exploreAfter')
const before = document.querySelector('#exploreBefore')
const reiszer = document.querySelector('#exploreResizer')

exploreRange.addEventListener('input', compare)

function compare() {
  let compareValue = this.value
  
  before.style.clipPath = `polygon(0% 0%, ${compareValue}% 0%, ${compareValue}% 100%, 0% 100%)`

  reiszer.style.left = `calc(${compareValue}% - 10px)`
  // reiszer.style.left = `${compareValue} - 10px%`
}

compare()