const ticketsName = document.querySelector('#ticketsName'),
  ticketsEmail = document.querySelector('#ticketsEmail'),
  ticketsPhone = document.querySelector('#ticketsPhone')

ticketsName.addEventListener('input', validateName)
ticketsEmail.addEventListener('input', validateEmail)
ticketsPhone.addEventListener('input', validatePhone)

function validateName() {
  const value = this.value
  const parent = this.parentNode
  const message = parent.querySelector('.error-message')
  const regexp = /^[a-zA-Zа-яА-Я\s]*$/

  if (value.length < 3) {
    parent.classList.add('error')
    message.textContent = 'This field must be at least 3 characters'
  } else if (value.length > 15) {
    parent.classList.add('error')
    message.textContent = 'This field must be no longer than 15 characters'
  } else if (regexp.test(value) !== true) {
    parent.classList.add('error')
    message.textContent = 'This field must contain only letters and spaces'
  } else {
    parent.classList.remove('error')
  }
}

function validateEmail() {
  const regexp = /^[a-zA-Z0-9_-]{3,15}@[a-zA-Z]{4,}\.[a-zA-Z]{2,}$/

  const value = this.value
  const parent = this.parentNode
  const message = parent.querySelector('.error-message')

  if (regexp.test(value) !== true) {
    parent.classList.add('error')
    message.textContent = 'Please enter a valid email address'
  } else {
    parent.classList.remove('error')
  }
}

function validatePhone() {
  const pattern = /^(\d{2,3}[ -]?)+$/

  const value = this.value
  const parent = this.parentNode

  const length = (value.match(/\d/g) || []).length
  const message = parent.querySelector('.error-message')

  if (pattern.test(value) !== true) {
    parent.classList.add('error')
    message.textContent = 'Please enter a valid phone number'
  } else if (length > 10) {
    parent.classList.add('error')
    message.textContent = 'Number is too long'
  } else {
    parent.classList.remove('error')
  }
}
