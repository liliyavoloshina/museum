const date = document.querySelector('#date'),
  time = document.querySelector('#time'),
  selectWrapper = document.getElementsByClassName('tickets-select'),
  selectLength = selectWrapper.length,
  incrExpDay = document.querySelector('#incrExpDay'),
  decrExpDay = document.querySelector('#decrExpDay')
expDayInput = document.querySelector('#expDay')

date.addEventListener('change', addClass)
time.addEventListener('change', addClass)
document.addEventListener('click', closeAllSelect)

incrExpDay.addEventListener('click', increment)
decrExpDay.addEventListener('click', decrement)

function addClass() {
  this.classList.add('has-value')
}

for (i = 0; i < selectLength; i++) {
  const selectedElement = selectWrapper[i].getElementsByTagName('select')[0]
  const selectedElementLength = selectedElement.length

  const fakeSelectedItem = document.createElement('div')
  fakeSelectedItem.setAttribute('class', 'select-selected')
  fakeSelectedItem.innerHTML =
    selectedElement.options[selectedElement.selectedIndex].innerHTML
  selectWrapper[i].appendChild(fakeSelectedItem)

  const fakeOptionList = document.createElement('div')
  fakeOptionList.setAttribute('class', 'select-items select-hide')

  for (j = 1; j < selectedElementLength; j++) {
    const fakeOptionItem = document.createElement('div')
    fakeOptionItem.innerHTML = selectedElement.options[j].innerHTML
    fakeOptionItem.addEventListener('click', function (e) {
      const originalSelect =
        this.parentNode.parentNode.getElementsByTagName('select')[0]
      const originalSelectLength = originalSelect.length
      const originalSelectedItem = this.parentNode.previousSibling

      for (i = 0; i < originalSelectLength; i++) {
        if (originalSelect.options[i].innerHTML == this.innerHTML) {
          originalSelect.selectedIndex = i
          originalSelectedItem.innerHTML = this.innerHTML
          const itemAsSelected =
            this.parentNode.getElementsByClassName('same-as-selected')
          const itemAsSelectedLength = itemAsSelected.length
          for (k = 0; k < itemAsSelectedLength; k++) {
            itemAsSelected[k].removeAttribute('class')
          }
          this.setAttribute('class', 'same-as-selected')
          break
        }
      }
      originalSelectedItem.click()
    })
    fakeOptionList.appendChild(fakeOptionItem)
  }
  selectWrapper[i].appendChild(fakeOptionList)
  fakeSelectedItem.addEventListener('click', function (e) {
    e.stopPropagation()
    closeAllSelect(this)
    this.nextSibling.classList.toggle('select-hide')
    this.classList.toggle('select-arrow-active')
  })
}

function closeAllSelect(element) {
  const arrayNo = []
  const selectedItems = document.getElementsByClassName('select-items')
  const selectedItem = document.getElementsByClassName('select-selected')
  const selectedItemsLength = selectedItems.length
  const selectedItemLength = selectedItem.length
  for (i = 0; i < selectedItemLength; i++) {
    if (element == selectedItem[i]) {
      arrayNo.push(i)
    } else {
      selectedItem[i].classList.remove('select-arrow-active')
    }
  }
  for (i = 0; i < selectedItemsLength; i++) {
    if (arrayNo.indexOf(i)) {
      selectWrapper[i].classList.add('select-hide')
    }
  }
}

function increment() {
  let oldVal = expDayInput.value
  let newVal = Number(oldVal + 1)
  expDayInput.value = newVal
}

function decrement() {
  let oldVal = Number(expDayInput.value)
  let newVal = oldVal - 1
  newVal = newVal.toString().padStart(2, '0')

  if (oldVal === 1 || oldVal === 31) {
    return
  }

  console.log(oldVal, newVal)
  expDayInput.value = newVal
}
