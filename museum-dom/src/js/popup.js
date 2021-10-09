import './custom-select'

const ticketsDate = document.querySelector('#ticketsDateInput'),
  time = document.querySelector('#time'),
  incrExpDay = document.querySelector('#incrExpDay'),
  decrExpDay = document.querySelector('#decrExpDay'),
  expDayInput = document.querySelector('#expDay'),
  expYearInput = document.querySelector('#expYear'),
  incrExpYear = document.querySelector('#incrExpYear'),
  decrExpYear = document.querySelector('#decrExpYear'),
  openPopup = document.querySelector('#openPopup'),
  popup = document.querySelector('#popup'),
  closePopup = document.querySelector('#closePopup'),
  popupOverlay = document.querySelector('#popupOverlay')

ticketsDate.addEventListener('change', addClass)
ticketsDate.addEventListener('change', changeDate)
time.addEventListener('change', addClass)
openPopup.addEventListener('click', toggleForm)
closePopup.addEventListener('click', toggleForm)
popupOverlay.addEventListener('click', toggleForm)

incrExpDay.addEventListener('click', incrementDay)
decrExpDay.addEventListener('click', decrementDay)
incrExpYear.addEventListener('click', incrementYear)
decrExpYear.addEventListener('click', decrementYear)

const presentDate = new Date()
const year = presentDate.getFullYear()
const month = presentDate.getMonth()
const day = presentDate.getDate()

const minDate = new Date(year, month, day + 1).toISOString().split('T')[0]
const maxDate = new Date(year + 5, month, day + 1).toISOString().split('T')[0]

ticketsDate.setAttribute('min', minDate)
ticketsDate.setAttribute('max', maxDate)

function addClass() {
  this.classList.add('has-value')
}

function changeDate() {
  const options = { weekday: 'long', month: 'long', day: 'numeric' }
  const dateToDisplay = new Date().toLocaleDateString('en-us', options)
  console.log(dateToDisplay)
}

changeDate()

function incrementDay() {
  let oldVal = Number(expDayInput.value)
  let newVal = oldVal + 1
  newVal = newVal.toString().padStart(2, '0')

  if (oldVal === 31) {
    return
  }

  expDayInput.value = newVal
}

function incrementYear() {
  let oldVal = Number(expYearInput.value)
  let newVal = oldVal + 1

  if (oldVal === 2050) {
    return
  }

  expYearInput.value = newVal
}

function decrementDay() {
  let oldVal = Number(expDayInput.value)
  let newVal = oldVal - 1
  newVal = newVal.toString().padStart(2, '0')

  if (oldVal === 1) {
    return
  }

  expDayInput.value = newVal
}

function decrementYear() {
  let oldVal = Number(expYearInput.value)
  let newVal = oldVal - 1

  if (oldVal === 2020) {
    return
  }

  expYearInput.value = newVal
}

function toggleForm() {
  popup.classList.toggle('opened')
  popupOverlay.classList.toggle('opened')
}
