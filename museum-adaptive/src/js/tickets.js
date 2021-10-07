const total = document.querySelector('#ticketsTotal'),
  permOption = document.querySelector('#permOption'),
  tempOption = document.querySelector('#tempOption'),
  combOption = document.querySelector('#combOption'),
  basicDecr = document.querySelector('#basicDecr'),
  basicIncr = document.querySelector('#basicIncr'),
  seniorDecr = document.querySelector('#seniorDecr'),
  seniorIncr = document.querySelector('#seniorIncr'),
  seniorAmountInput = document.querySelector('#seniorAmount'),
  basicAmountInput = document.querySelector('#basicAmount')

// function changeType() {}

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
      basicAmountInput.stepUp(1)
      this.basicAmount++
    }
    if (age === 'senior') {
      if (this.seniorAmount === 20) return
      seniorAmountInput.stepUp(1)
      this.seniorAmount++
    }

    this.caclulate()
  }

  decrement(age) {
    if (age === 'basic') {
      if (this.basicAmount === 0) return
      basicAmountInput.stepDown(1)
      this.basicAmount--
    }
    if (age === 'senior') {
      if (this.seniorAmount === 0) return
      seniorAmountInput.stepDown(1)
      this.seniorAmount--
    }

    this.caclulate()
  }

  caclulate() {
    const totalSection = document.querySelector('#ticketsTotalSection')
    let typeSum = this.type === 'perm' ? 20 : this.type === 'temp' ? 25 : 40
    let basicAmount = typeSum * this.basicAmount
    let seniorAmount = typeSum / 2 * this.seniorAmount
    let total = basicAmount + seniorAmount
    totalSection.textContent = total
  }
}

const ticketsTotal = new TicketsTotal()
basicIncr.addEventListener('click', () => ticketsTotal.increment('basic'))
basicDecr.addEventListener('click', () => ticketsTotal.decrement('basic'))
seniorIncr.addEventListener('click', () => ticketsTotal.increment('senior'))
seniorDecr.addEventListener('click', () => ticketsTotal.decrement('senior'))
// basicIncr.addEventListener('click', ticketsTotal.increment('basic'))

// (20 €, 25 €, 40 € для Basic и половина этой стоимости для Senior).
