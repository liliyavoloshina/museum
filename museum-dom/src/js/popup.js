import './custom-select'

const ticketsDateInput = document.querySelector('#ticketsDateInput'),
  ticketsDateDisplay = document.querySelector('#ticketsDateDisplay'),
  ticketsTimeInput = document.querySelector('#ticketsTimeInput'),
  ticketsTimeDisplay = document.querySelector('#ticketsTimeDisplay'),
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

ticketsDateInput.addEventListener('change', addClass)
ticketsDateInput.addEventListener('change', changeDate)
ticketsTimeInput.addEventListener('change', addClass)
ticketsTimeInput.addEventListener('change', changeTime)
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
const maxDate = new Date(year, month + 1, day + 1).toISOString().split('T')[0]

ticketsDateInput.setAttribute('min', minDate)
ticketsDateInput.setAttribute('max', maxDate)

const curDate = new Date().getFullYear()
const minExpDate = new Date().getFullYear()
const maxExpDate = new Date(year + 3, month, day).getFullYear()
expYearInput.value = curDate
expYearInput.setAttribute('max', maxExpDate)
expYearInput.setAttribute('min', minExpDate)

function addClass() {
  this.classList.add('has-value')
}

function changeDate() {
  const newDate = this ? new Date(this.value) : new Date()
  const options = { weekday: 'long', month: 'long', day: 'numeric' }
  const dateToDisplay = newDate.toLocaleDateString('en-us', options)
  ticketsDateDisplay.textContent = dateToDisplay
}

changeDate()

function changeTime() {
  ticketsTimeDisplay.textContent = this.value
}

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
  const oldVal = Number(expYearInput.value)
  const newVal = oldVal + 1

  const maxVal = +expYearInput.getAttribute('max')

  if (oldVal === maxVal) {
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
  const oldVal = Number(expYearInput.value)
  const newVal = oldVal - 1

  const minVal = +expYearInput.getAttribute('min')

  if (oldVal === minVal) {
    return
  }

  expYearInput.value = newVal
}

function toggleForm() {
  popup.classList.toggle('opened')
  popupOverlay.classList.toggle('opened')
}
