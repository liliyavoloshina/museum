import { updateCustomSelectChecked } from './custom-select'

const permOption = document.querySelector('#permOption'),
  tempOption = document.querySelector('#tempOption'),
  combOption = document.querySelector('#combOption'),
  basicDecr = document.querySelectorAll('.basicDecr'),
  basicIncr = document.querySelectorAll('.basicIncr'),
  seniorDecr = document.querySelectorAll('.seniorDecr'),
  seniorIncr = document.querySelectorAll('.seniorIncr'),
  elSelectCustom = document.querySelector('#selectCustom'),
  elSelectCustomOpts = elSelectCustom.children[1],
  customOptsList = Array.from(elSelectCustomOpts.children),
  basicAmountDisplay = document.querySelectorAll('.basicAmountDisplay'),
  seniorAmountDisplay = document.querySelectorAll('.seniorAmountDisplay'),
  ticketsTypeForm = document.querySelector('#ticketsTypeForm'),
  basicTypeSums = document.querySelectorAll('.basicTypeSum'),
  seniorTypeSums = document.querySelectorAll('.seniorTypeSum'),
  basicTotalPrice = document.querySelector('#basicTotalPrice'),
  seniorTotalPrice = document.querySelector('#seniorTotalPrice'),
  ticketsTotalSum = document.querySelectorAll('.ticketsTotalSum')

class TicketsTotal {
  constructor() {
    this.total = 0
    this.basicAmount = 0
    this.seniorAmount = 0
    this.type = 'perm'
    this.typeSum = 20
    this.basicTicketsPrice = 20
    this.seniorTicketsPrice = 10
  }

  increment(age) {
    if (age === 'basic') {
      if (this.basicAmount === 20) return
      this.basicAmount++
      this.changeBasicAmount()
    }

    if (age === 'senior') {
      if (this.seniorAmount === 20) return
      this.seniorAmount++
      this.changeSeniorAmount()
    }

    this.recalculate()
  }

  decrement(age) {
    if (age === 'basic') {
      if (this.basicAmount === 0) return
      this.basicAmount--
      this.changeBasicAmount()
    }
    if (age === 'senior') {
      if (this.seniorAmount === 0) return
      this.seniorAmount--
      this.changeSeniorAmount()
    }

    this.recalculate()
  }

  changeBasicAmount() {
    basicAmountDisplay.forEach(el => {
      el.value ? el.value = this.basicAmount : el.textContent = this.basicAmount
    })

    // how to do this before window is closed???
    localStorage.setItem('tickets-basic-museum', this.basicAmount)
  }

  changeSeniorAmount() {
    seniorAmountDisplay.forEach(el => {
      el.value ? el.value = this.seniorAmount : el.textContent = this.seniorAmount
    })

    // how to do this before window is closed???
    localStorage.setItem('tickets-senior-museum', this.seniorAmount)
  }

  changeType(type) {
    this.type = type

    
    // how to do this before window is closed???
    localStorage.setItem('tickets-type-museum', this.type)

    this.changeTypeForm()
    this.changeTypeSection()
    this.changeTypeSum()

    this.recalculate()

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
    ticketsTypeForm.textContent = text
    updateCustomSelectChecked(this.type, text)
  }

  changeTypeSum() {
    this.typeSum = this.type === 'perm' ? 20 : this.type === 'temp' ? 25 : 40

    basicTypeSums.forEach(el => {
      el.textContent = this.typeSum
    })
    seniorTypeSums.forEach(el => {
      el.textContent = this.typeSum / 2
    })
  }

  recalculate() {
    this.calcTicketsTotalPrice()

    this.total = this.basicTicketsPrice + this.seniorTicketsPrice

    ticketsTotalSum.forEach(totalEl => {
      totalEl.textContent = this.total
    })

    // how to do this before window is closed???
    localStorage.setItem('tickets-total-museum', this.total)
  }

  calcTicketsTotalPrice() {
    this.basicTicketsPrice = this.typeSum * this.basicAmount
    this.seniorTicketsPrice = (this.typeSum / 2) * this.seniorAmount

    basicTotalPrice.textContent = this.basicTicketsPrice
    seniorTotalPrice.textContent = this.seniorTicketsPrice
  }

  getLocalStorage() {
    const total = localStorage.getItem('tickets-total-museum')
    const type = localStorage.getItem('tickets-type-museum')
    const basicAmount = localStorage.getItem('tickets-basic-museum')
    const seniorAmount = localStorage.getItem('tickets-senior-museum')

    if (total) {
      this.total = total
      ticketsTotalSum.forEach(totalEl => {
        totalEl.textContent = this.total
      })
    }

    if (basicAmount) {
      this.basicAmount = basicAmount
      this.changeBasicAmount()
    }

    if (seniorAmount) {
      this.seniorAmount = seniorAmount
      this.changeSeniorAmount()
    }

    // dont replace cuz it reset local storage 
    if (type) {
      this.changeType(type)
    }

    this.calcTicketsTotalPrice()
  }
}

const ticketsTotal = new TicketsTotal()

basicIncr.forEach(btn => {
  btn.addEventListener('click', () => ticketsTotal.increment('basic'))
})

basicDecr.forEach(btn => {
  btn.addEventListener('click', () => ticketsTotal.decrement('basic'))
})

seniorIncr.forEach(btn => {
  btn.addEventListener('click', () => ticketsTotal.increment('senior'))
})

seniorDecr.forEach(btn => {
  btn.addEventListener('click', () => ticketsTotal.decrement('senior'))
})

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

window.addEventListener('load', ticketsTotal.getLocalStorage())
