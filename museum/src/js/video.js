document.querySelector('#video-range-progress').addEventListener('input', handleInputChange)
document.querySelector('#video-range-volume').addEventListener('input', handleInputChange)

function handleInputChange(e) {
  const value = e.target.value;
  this.style.background = `linear-gradient(to right, #24809e 0%, #24809e ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`
}