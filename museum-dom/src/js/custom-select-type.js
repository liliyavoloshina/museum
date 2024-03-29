const elSelectNative = document.querySelector('#selectNativeType'),
  elSelectCustom = document.querySelector('#selectCustomType'),
  elSelectCustomBox = elSelectCustom.children[0],
  elSelectCustomOpts = elSelectCustom.children[1],
  customOptsList = Array.from(elSelectCustomOpts.children),
  optionsCount = customOptsList.length

let optionChecked = ''
let optionHoveredIndex = -1

// Toggle custom select visibility when clicking the box
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
  // Remove aria-hidden in case this was opened by a user
  // who uses AT (e.g. Screen Reader) and a mouse at the same time.
  elSelectCustom.setAttribute('aria-hidden', false)

  if (optionChecked) {
    const optionCheckedIndex = customOptsList.findIndex(el => el.getAttribute('data-value') === optionChecked)
    updateCustomSelectHovered(optionCheckedIndex)
  }

  // Add related event listeners
  document.addEventListener('click', watchClickOutside)
  document.addEventListener('keydown', supportKeyboardNavigation)
}

function closeSelectCustom() {
  elSelectCustom.classList.remove('isActive')

  elSelectCustom.setAttribute('aria-hidden', true)

  updateCustomSelectHovered(-1)

  // Remove related event listeners
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

function updateCustomSelectChecked(value, text) {
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
  // press down -> go next
  if (event.keyCode === 40 && optionHoveredIndex < optionsCount - 1) {
    let index = optionHoveredIndex
    event.preventDefault() // prevent page scrolling
    updateCustomSelectHovered(optionHoveredIndex + 1)
  }

  // press up -> go previous
  if (event.keyCode === 38 && optionHoveredIndex > 0) {
    event.preventDefault() // prevent page scrolling
    updateCustomSelectHovered(optionHoveredIndex - 1)
  }

  // press Enter or space -> select the option
  if (event.keyCode === 13 || event.keyCode === 32) {
    event.preventDefault()

    const option = elSelectCustomOpts.children[optionHoveredIndex]
    const value = option && option.getAttribute('data-value')

    if (value) {
      elSelectNative.value = value
      updateCustomSelectChecked(value, option.textContent)
    }
    closeSelectCustom()
  }

  // press ESC -> close selectCustom
  if (event.keyCode === 27) {
    closeSelectCustom()
  }
}

// Update selectCustom value when selectNative is changed.
elSelectNative.addEventListener('change', e => {
  const value = e.target.value
  const elRespectiveCustomOption = elSelectCustomOpts.querySelectorAll(`[data-value="${value}"]`)[0]

  updateCustomSelectChecked(value, elRespectiveCustomOption.textContent)
})

// Update selectCustom value when an option is clicked or hovered
customOptsList.forEach(function(elOption, index) {
  elOption.addEventListener('click', e => {
    const value = e.target.getAttribute('data-value')

    // Sync native select to have the same value
    elSelectNative.value = value
    updateCustomSelectChecked(value, e.target.textContent)
    closeSelectCustom()
  })

  elOption.addEventListener('mouseenter', e => {
    updateCustomSelectHovered(index)
  })
})

export { updateCustomSelectChecked }
