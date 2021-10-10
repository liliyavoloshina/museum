const ticketsName = document.querySelector('#ticketsName'),
  ticketsEmail = document.querySelector('#ticketsEmail'),
  ticketsPhone = document.querySelector('#ticketsPhone'),
  ticketsCardNumber = document.querySelector('#ticketsCardNumber'),
  cardholderInput = document.querySelector('#cardholderInput'),
  cvvInput = document.querySelector('#cvvInput')

ticketsName.addEventListener('input', validateName)
ticketsEmail.addEventListener('input', validateEmail)
ticketsPhone.addEventListener('input', validatePhone)
ticketsCardNumber.addEventListener('input', validateCard)
cardholderInput.addEventListener('input', validateCardholder)
cvvInput.addEventListener('input', validateCvv)

function validateName() {
  const value = this.value
  const parent = this.parentNode
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
  }
}

function validateEmail() {
  const regexp = /^[a-zA-Z0-9_-]{3,15}@[a-zA-Z]{4,}\.[a-zA-Z]{2,}$/

  const value = this.value
  const parent = this.parentNode
  const message = parent.querySelector('.error-message')

  if (value === '') {
    parent.classList.add('error')
    message.textContent = 'This field is required'
  } else if (regexp.test(value) !== true) {
    parent.classList.add('error')
    message.textContent = 'Please enter a valid email address'
  } else {
    parent.classList.remove('error')
  }
}

function validatePhone() {
  const pattern = /^(?:[0-9]{2,3}([ -][0-9]{2,3})*|[0-9]{1,10})$/

  const value = this.value
  const parent = this.parentNode

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
  }
}

function validateCard() {
  const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/
  const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/

  const value = this.value
  const parent = this.parentNode
  const message = parent.querySelector('.error-message')

  if (value === '') {
    parent.classList.add('error')
    message.textContent = 'This field is required'
  } else if (visaRegEx.test(value) || mastercardRegEx.test(value)) {
    parent.classList.remove('error')
  } else {
    parent.classList.add('error')
    message.textContent = 'We accept only Mastercard and Visa'
  }
}

function validateCardholder() {
  const pattern = /^([A-Za-z]{3,})\s([A-Za-z]{3,})$/

  const value = this.value
  const parent = this.parentNode
  const message = parent.querySelector('.error-message')
  if (value === '') {
    parent.classList.add('error')
    message.textContent = 'This field is required'
  } else if (pattern.test(value) !== true) {
    parent.classList.add('error')
    message.textContent = 'Please enter a valid name and surname'
  } else {
    parent.classList.remove('error')
  }
}

function validateCvv() {
  const pattern = /^[0-9]{3,4}$/

  const value = this.value
  const parent = this.parentNode
  const message = parent.querySelector('.error-message')
  
  if (value.length > 4) {
    cvvInput.value = value
  }

  if (value === '') {
    parent.classList.add('error')
    message.textContent = 'This field is required'
  } else if (pattern.test(value) !== true) {
    parent.classList.add('error')
    message.textContent = 'Please enter a valid CVV-code'
  } else {
    parent.classList.remove('error')
  }
}
