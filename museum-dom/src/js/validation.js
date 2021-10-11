import { toggleForm } from './modal'

const ticketsName = document.querySelector('#ticketsName'),
  ticketsEmail = document.querySelector('#ticketsEmail'),
  ticketsPhone = document.querySelector('#ticketsPhone'),
  ticketsCardNumber = document.querySelector('#ticketsCardNumber'),
  cardholderInput = document.querySelector('#cardholderInput'),
  cvvInput = document.querySelector('#cvvInput'),
  ticketsBook = document.querySelector('#ticketsBook'),
  popupSuccess = document.querySelector('#popupSuccess'),
  customerName = document.querySelector('#customerName')

ticketsName.addEventListener('input', validateName)
ticketsEmail.addEventListener('input', validateEmail)
ticketsPhone.addEventListener('input', validatePhone)
ticketsCardNumber.addEventListener('input', validateCard)
cardholderInput.addEventListener('input', validateCardholder)
cvvInput.addEventListener('input', validateCvv)
ticketsBook.addEventListener('click', validateSubmit)

function validateName() {
  const value = ticketsName.value
  const parent = ticketsName.parentNode
  const message = parent.querySelector('.error-message')
  const regexp = /^[a-zA-Zа-яА-Я\s]*$/

  if (value === '') {
    parent.classList.add('error')
    message.textContent = 'This field is required'
  } else if (regexp.test(value) !== true) {
    parent.classList.add('error')
    message.textContent = 'This field must contain only letters and spaces'
  } else if (value.length < 3) {
    parent.classList.add('error')
    message.textContent = 'This field must be at least 3 characters'
  } else if (value.length > 15) {
    parent.classList.add('error')
    message.textContent = 'This field must be no longer than 15 characters'
  } else {
    parent.classList.remove('error')
    return true
  }
}

function validateEmail() {
  const regexp = /^[a-zA-Z0-9_-]{3,15}@[a-zA-Z]{4,}\.[a-zA-Z]{2,}$/

  const value = ticketsEmail.value
  const parent = ticketsEmail.parentNode
  const message = parent.querySelector('.error-message')

  if (value === '') {
    parent.classList.add('error')
    message.textContent = 'This field is required'
  } else if (regexp.test(value) !== true) {
    parent.classList.add('error')
    message.textContent = 'Please enter a valid email address'
  } else {
    parent.classList.remove('error')
    return true
  }
}

function validatePhone() {
  const pattern = /^(?:[0-9]{2,3}([ -][0-9]{2,3})*|[0-9]{1,10})$/

  const value = ticketsPhone.value
  const parent = ticketsPhone.parentNode

  const length = (value.match(/\d/g) || []).length
  const message = parent.querySelector('.error-message')

  if (value === '') {
    parent.classList.add('error')
    message.textContent = 'This field is required'
  } else if (pattern.test(value) !== true) {
    parent.classList.add('error')
    message.textContent = 'Please enter a valid phone number'
  } else if (length > 10) {
    parent.classList.add('error')
    message.textContent = 'Number is too long'
  } else {
    parent.classList.remove('error')
    return true
  }
}

function validateCard() {
  const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/
  const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/

  const value = ticketsCardNumber.value
  const parent = ticketsCardNumber.parentNode
  const message = parent.querySelector('.error-message')

  if (value === '') {
    parent.classList.add('error')
    message.textContent = 'This field is required'
  } else if (visaRegEx.test(value) || mastercardRegEx.test(value)) {
    parent.classList.remove('error')
    return true
  } else {
    parent.classList.add('error')
    message.textContent = 'We accept only Mastercard and Visa'
  }
}

function validateCardholder() {
  const pattern = /^([A-Za-z]{3,})\s([A-Za-z]{3,})$/

  const value = cardholderInput.value
  const parent = cardholderInput.parentNode
  const message = parent.querySelector('.error-message')
  if (value === '') {
    parent.classList.add('error')
    message.textContent = 'This field is required'
  } else if (pattern.test(value) !== true) {
    parent.classList.add('error')
    message.textContent = 'Please enter a valid name and surname'
  } else {
    parent.classList.remove('error')
    return true
  }
}

function validateCvv() {
  const pattern = /^[0-9]{3,4}$/

  const value = cvvInput.value
  const parent = cvvInput.parentNode
  const message = parent.querySelector('.error-message')
  const note = document.querySelector('.cvv-code__note')

  if (value.length > 4) {
    cvvInput.value = value
  }

  if (value === '') {
    parent.classList.add('error')
    message.textContent = 'This field is required'
    note.classList.add('hidden')
  } else if (pattern.test(value) !== true) {
    parent.classList.add('error')
    message.textContent = 'Please enter a valid CVV-code'
    note.classList.add('hidden')
  } else {
    parent.classList.remove('error')
    note.classList.remove('hidden')
    return true
  }
}

function clearForm() {
  ticketsName.value = ''
  ticketsEmail.value = ''
  ticketsPhone.value = ''
  ticketsCardNumber.value = ''
  cardholderInput.value = ''
  cvvInput.value = ''
}

function openPopup() {
  popupSuccess.classList.add('opened')

  setTimeout(() => {
    popupSuccess.classList.remove('opened')
  }, 5000)
}

function validateSubmit() {
  validateName()
  validateEmail()
  validatePhone()
  validateCard()
  validateCardholder()
  validateCvv()

  if (validateName() && validateEmail() && validatePhone() && validateCard() && validateCardholder() && validateCvv()) {
    // dispatch click on reset button so we clear local storage
    let click = new Event('click')
    document.querySelector('#ticketsReset').dispatchEvent(click)
    toggleForm()
    customerName.textContent = ticketsName.value
    openPopup()
    // clear all form fields
    clearForm()
  }
}
