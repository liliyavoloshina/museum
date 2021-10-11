const elSelectNative = document.querySelector('#selectNativeTime'),
  elSelectCustom = document.querySelector('#selectCustomTime'),
  ticketsTimeDisplay = document.querySelector('#ticketsTimeDisplay'),
  elSelectCustomBox = elSelectCustom.children[0],
  elSelectCustomOpts = elSelectCustom.children[1],
  customOptsList = Array.from(elSelectCustomOpts.children),
  optionsCount = customOptsList.length

let optionChecked = ''
let optionHoveredIndex = -1

elSelectCustomBox.addEventListener('click', e => {
  const isClosed = !elSelectCustom.classList.contains('isActive')

  if (isClosed) {
    openSelectCustom()
  } else {
    closeSelectCustom()
  }
})

function openSelectCustom() {
  elSelectCustom.classList.add('isActive')
  elSelectCustom.setAttribute('aria-hidden', false)

  if (optionChecked) {
    const optionCheckedIndex = customOptsList.findIndex(el => el.getAttribute('data-value') === optionChecked)
    updateCustomSelectHovered(optionCheckedIndex)
  }

  document.addEventListener('click', watchClickOutside)
  document.addEventListener('keydown', supportKeyboardNavigation)
}

function closeSelectCustom() {
  elSelectCustom.classList.remove('isActive')

  elSelectCustom.setAttribute('aria-hidden', true)

  updateCustomSelectHovered(-1)

  document.removeEventListener('click', watchClickOutside)
  document.removeEventListener('keydown', supportKeyboardNavigation)
}

function updateCustomSelectHovered(newIndex) {
  const prevOption = elSelectCustomOpts.children[optionHoveredIndex]
  const option = elSelectCustomOpts.children[newIndex]

  if (prevOption) {
    prevOption.classList.remove('isHover')
  }
  if (option) {
    option.classList.add('isHover')
  }

  optionHoveredIndex = newIndex
}

function updateTimeDisplay(text) {
  ticketsTimeDisplay.textContent = text
}

function updateCustomSelectTimeChecked(value, text) {
  const prevValue = optionChecked

  const elPrevOption = elSelectCustomOpts.querySelector(`[data-value="${prevValue}"`)
  const elOption = elSelectCustomOpts.querySelector(`[data-value="${value}"`)

  if (elPrevOption) {
    elPrevOption.classList.remove('isActive')
  }

  if (elOption) {
    elOption.classList.add('isActive')
  }

  elSelectCustomBox.textContent = text
  optionChecked = value
}

function watchClickOutside(event) {
  const didClickedOutside = !elSelectCustom.contains(event.target)
  if (didClickedOutside) {
    closeSelectCustom()
  }
}

function supportKeyboardNavigation(event) {
  if (event.keyCode === 40 && optionHoveredIndex < optionsCount - 1) {
    let index = optionHoveredIndex
    event.preventDefault()
    updateCustomSelectHovered(optionHoveredIndex + 1)
  }

  if (event.keyCode === 38 && optionHoveredIndex > 0) {
    event.preventDefault()
    updateCustomSelectHovered(optionHoveredIndex - 1)
  }

  if (event.keyCode === 13 || event.keyCode === 32) {
    event.preventDefault()

    const option = elSelectCustomOpts.children[optionHoveredIndex]
    const value = option && option.getAttribute('data-value')

    if (value) {
      elSelectNative.value = value
      updateCustomSelectTimeChecked(value, option.textContent)
    }
    closeSelectCustom()
  }

  if (event.keyCode === 27) {
    closeSelectCustom()
  }
}

elSelectNative.addEventListener('change', e => {
  const value = e.target.value
  const elRespectiveCustomOption = elSelectCustomOpts.querySelectorAll(`[data-value="${value}"]`)[0]

  updateCustomSelectTimeChecked(value, elRespectiveCustomOption.textContent)
})

customOptsList.forEach((elOption, index) => {
  elOption.addEventListener('click', e => {
    const value = e.target.getAttribute('data-value')

    elSelectNative.value = value
    updateCustomSelectTimeChecked(value, e.target.textContent)
    closeSelectCustom()
    updateTimeDisplay(value)
  })

  elOption.addEventListener('mouseenter', e => {
    const value = e.target.getAttribute('data-value')
    updateCustomSelectHovered(index)
    updateTimeDisplay(value)
  })
})
