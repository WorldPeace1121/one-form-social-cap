import dayjs from 'dayjs'
import Swal from 'sweetalert2'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
export const emptyString = function (str) {
  return typeof str === 'undefined' || str == null || str === ''
}

export const toNumber = function (str) {
  return Number(str)
}

export const preventInvalidKeys = function (event) {
  const key = event.key
  if (!/^[0-9]$/.test(key) && key !== 'Backspace' && key !== 'Delete') {
    event.preventDefault()
  }
}
export const preventInvalidPaste = function (event) {
  const pasteContent = (event.clipboardData || window.clipboardData).getData('text')
  const sanitizedContent = pasteContent.replace(/[^0-9]/g, '')
  event.preventDefault()
  const inputElement = event.target
  const selectionStart = inputElement.selectionStart
  const selectionEnd = inputElement.selectionEnd
  inputElement.value =
    inputElement.value.slice(0, selectionStart) +
    sanitizedContent +
    inputElement.value.slice(selectionEnd)
  inputElement.setSelectionRange(
    selectionStart + sanitizedContent.length,
    selectionStart + sanitizedContent.length,
  )
}

export const preventFloatInvalidKeys = function (event) {
  const key = event.key
  const input = event.target.value
  if (key === 'Backspace' || key === 'Delete') {
    return
  }
  if (!/^[0-9]$/.test(key) && key !== '.') {
    event.preventDefault()
    return
  }
  if (input === '0' && key === '0') {
    event.preventDefault()
    return
  }

  if (input.startsWith('0') && key !== '.' && !input.includes('.')) {
    event.preventDefault()
    return
  }
  if (key === '.' && input.includes('.')) {
    event.preventDefault()
    return
  }
}

export const preventFloatInvalidPaste = function (event) {
  const pasteContent = (event.clipboardData || window.clipboardData).getData('text')
  const sanitizedContent = pasteContent.match(/^(0|([1-9][0-9]*))(\.[0-9]*)?/)
  if (sanitizedContent) {
    event.preventDefault()
    const inputElement = event.target
    const selectionStart = inputElement.selectionStart
    const selectionEnd = inputElement.selectionEnd
    inputElement.value =
      inputElement.value.slice(0, selectionStart) +
      sanitizedContent[0] +
      inputElement.value.slice(selectionEnd)
    inputElement.setSelectionRange(
      selectionStart + sanitizedContent[0].length,
      selectionStart + sanitizedContent[0].length,
    )
  } else {
    event.preventDefault()
  }
}

export const formatDate = function (date, format = 'dddd, MMMM D, YYYY h:mm A', isUnix = true) {
  const timestamp = BigInt(date)
  let convertedTimestamp = Number(timestamp)
  if (isUnix) {
    convertedTimestamp = convertedTimestamp * 1000
  }
  return dayjs(convertedTimestamp).format(format)
}

export const formatDateTime = function (date, format = 'dddd, MMMM D, YYYY h:mm A') {
  return dayjs(date).format(format)
}

export const dateFromNow = function (date) {
  return dayjs(date).fromNow()
}

export const toDays = function (s) {
  return Number(s) / 60 / 60 / 24
}

export const customAlert = {
  warning: (message) => {
    Swal.fire({
      icon: 'warning',
      title: 'Warning',
      text: message,
    })
  },
  error: (message) => {
    Swal.fire({
      icon: 'error',
      customClass: {
        confirmButton:
          'q-btn q-btn-item non-selectable no-outline  q-btn--rectangle bg-negative text-white q-btn--unelevated q-btn--actionable q-focusable q-hoverable ',
      },
      title: 'Error',
      text: message,
      confirmButtonText: `<span class="q-focus-helper" tabindex="-1"></span><span class="q-btn__content text-center col items-center q-anchor--skip justify-center row">I know</span>`,
    })
  },
  success: (message) => {
    Swal.fire({
      icon: 'success',
      customClass: {
        confirmButton:
          'q-btn q-btn-item non-selectable no-outline  q-btn--rectangle bg-primary text-white q-btn--unelevated q-btn--actionable q-focusable q-hoverable ',
      },
      title: 'Success',
      text: message,
      confirmButtonText: `<span class="q-focus-helper" tabindex="-1"></span><span class="q-btn__content text-center col items-center q-anchor--skip justify-center row">I know</span>`,
    })
  },
}

export const customToast = (icon, title) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer
      toast.onmouseleave = Swal.resumeTimer
    },
  })
  Toast.fire({
    icon: icon,
    title: title,
  })
}

export const confirmAlert = async (message, cFunction = () => {}) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: message,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: `<span class="q-focus-helper" tabindex="-1"></span><span class="q-btn__content text-center col items-center q-anchor--skip justify-center row">Confirm</span>`,
    cancelButtonText: `<span class="q-focus-helper" tabindex="-1"></span><span class="q-btn__content text-center col items-center q-anchor--skip justify-center row">Cancel</span>`,
    customClass: {
      confirmButton:
        'q-btn q-btn-item non-selectable no-outline  q-btn--rectangle bg-primary text-white q-btn--unelevated q-btn--actionable q-focusable q-hoverable ',
      cancelButton:
        'q-btn q-btn-item non-selectable no-outline  q-btn--rectangle bg-negative text-white q-btn--unelevated q-btn--actionable q-focusable q-hoverable ',
    },
  })
  if (result.isConfirmed) {
    await cFunction()
  }
}

export const toDataCapTB = function (string) {
  string = string.toLowerCase()
  string = string.replace(' ', '')
  if (!string.includes('tib') && !string.includes('pib') && !string.includes('gib')) {
    return 0
  }
  if (string.includes('pib')) {
    const num = string.replace('pib', '')
    return parseFloat(num) * 1024
  }
  if (string.includes('gib')) {
    const num = string.replace('gib', '')
    return parseFloat(num) / 1024
  }
  const num = string.replace('tib', '')
  return num
}

export const justCapUnit = function (string) {
  string = string.toLowerCase()
  string = string.replace(' ', '')
  if (string.includes('tib')) {
    return true
  }
  if (string.includes('gib')) {
    return true
  }
  if (string.includes('pib')) {
    return true
  }
  return false
}

export const mediaIsImage = function (url) {
  return (
    url.endsWith('.jpg') ||
    url.endsWith('.jpeg') ||
    url.endsWith('.png') ||
    url.endsWith('.gif') ||
    url.endsWith('.bmp') ||
    url.endsWith('.webp')
  )
}
