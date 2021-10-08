import { selectedType, optionList, updateCustomSelectChecked } from './popup'

const totalSection = document.querySelector('#ticketsTotalSection'),
  permOption = document.querySelector('#permOption'),
  tempOption = document.querySelector('#tempOption'),
  combOption = document.querySelector('#combOption'),
  basicDecr = document.querySelector('#basicDecr'),
  basicIncr = document.querySelector('#basicIncr'),
  seniorDecr = document.querySelector('#seniorDecr'),
  seniorIncr = document.querySelector('#seniorIncr'),
  seniorAmountInput = document.querySelector('#seniorAmount'),
  basicAmountInput = document.querySelector('#basicAmount'),
  elSelectCustom = document.querySelector('#selectCustom'),
  elSelectCustomOpts = elSelectCustom.children[1],
  customOptsList = Array.from(elSelectCustomOpts.children)

class TicketsTotal {
  constructor() {
    this.total = 0
    this.basicAmount = 0
    this.seniorAmount = 0
    this.type = 'perm'
  }

  increment(age) {
    if (age === 'basic') {
      if (this.basicAmount === 20) return
      this.basicAmount++
      this.changeBasicAmount(this.basicAmount)
    }
    if (age === 'senior') {
      if (this.seniorAmount === 20) return
      this.seniorAmount++
      this.changeSeniorAmount(this.seniorAmount)
    }

    this.caclulate()
  }

  decrement(age) {
    if (age === 'basic') {
      if (this.basicAmount === 0) return
      this.basicAmount--
      this.changeBasicAmount(this.basicAmount)
    }
    if (age === 'senior') {
      if (this.seniorAmount === 0) return
      this.seniorAmount--
      this.changeSeniorAmount(this.seniorAmount)
    }

    this.caclulate()
  }

  changeBasicAmount(value) {
    basicAmountInput.value = value
  }

  changeSeniorAmount(value) {
    seniorAmountInput.value = value
  }

  changeType(type) {
    this.type = type

    this.changeTypeForm()
    this.changeTypeSection()

    this.caclulate()
  }

  changeTypeSection() {
    const types = document.querySelectorAll('.tickets-type-option__input')
    types.forEach(input => {
      input.dataset.id === this.type ? (input.checked = true) : (input.checked = false)
    })
  }

  changeTypeForm() {
    let text =
      this.type === 'perm'
        ? 'Permanent exhibition'
        : this.type === 'temp'
        ? 'Temporary exhibition'
        : 'Combined Admission'

    updateCustomSelectChecked(this.type, text)
  }

  setValue() {
    const total = localStorage.getItem('tickets-total-museum')
    const type = localStorage.getItem('tickets-type-museum')
    const basicAmount = localStorage.getItem('tickets-basic-museum')
    const seniorAmount = localStorage.getItem('tickets-senior-museum')

    if (total) {
      totalSection.textContent = total
    }

    if (type) {
      this.changeType(type)
    }

    if (basicAmount) {
      this.basicAmount = basicAmount
      basicAmountInput.value = basicAmount
    }

    if (seniorAmount) {
      this.seniorAmount = seniorAmount
      seniorAmountInput.value = seniorAmount
    }
  }

  caclulate() {
    let typeSum = this.type === 'perm' ? 20 : this.type === 'temp' ? 25 : 40
    let basicAmount = typeSum * this.basicAmount
    let seniorAmount = (typeSum / 2) * this.seniorAmount
    let total = basicAmount + seniorAmount
    totalSection.textContent = total

    localStorage.setItem('tickets-total-museum', total)
    localStorage.setItem('tickets-type-museum', this.type)
    localStorage.setItem('tickets-basic-museum', this.basicAmount)
    localStorage.setItem('tickets-senior-museum', this.seniorAmount)
  }
}

const ticketsTotal = new TicketsTotal()
ticketsTotal.setValue()
basicIncr.addEventListener('click', () => ticketsTotal.increment('basic'))
basicDecr.addEventListener('click', () => ticketsTotal.decrement('basic'))
seniorIncr.addEventListener('click', () => ticketsTotal.increment('senior'))
seniorDecr.addEventListener('click', () => ticketsTotal.decrement('senior'))

permOption.addEventListener('click', () => ticketsTotal.changeType('perm'))
tempOption.addEventListener('click', () => ticketsTotal.changeType('temp'))
combOption.addEventListener('click', () => ticketsTotal.changeType('comb'))

customOptsList.forEach(elOption => {
  elOption.addEventListener('click', e => {
    const value = e.target.getAttribute('data-value')
    ticketsTotal.changeType(value)
  })

  elOption.addEventListener('mouseenter', e => {
    const value = e.target.getAttribute('data-value')
    ticketsTotal.changeType(value)
  })
})
