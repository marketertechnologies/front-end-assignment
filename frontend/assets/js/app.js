import '@fortawesome/fontawesome-free/css/fontawesome.css'
import '@fortawesome/fontawesome-free/css/regular.css'
import '@fortawesome/fontawesome-free/css/solid.css'
import '../scss/app.scss'
import { errorBroadcaster } from './broadcasters'
import { keydownListener } from './listeners'
import {
  validateCountry,
  validateCreditCard,
  validateCVV,
  validateEmail,
  validateExpDate,
  validateFirstname,
  validateLastname,
  validatePhone,
  validatePostalCode,
} from './validators'

const getElement = (selector) => document.querySelector(selector) || {}
const getValue = (element) => element.value

const getInputBroadcaster = (eventType) => (listener) => (input) => {
  input.addEventListener(eventType, listener)
}

const validate = (broadcaster) => (selector) => (validator) => () => {
  const element = getElement(selector)

  return broadcaster(
    () => validator(getValue(element)),
    () => {
      element.classList.add('error')
      element.focus()
    }
  )
}
const getValueValidator = validate(errorBroadcaster)

const validators = [
  getValueValidator('#firstname')(validateFirstname),
  getValueValidator('#lastname')(validateLastname),
  getValueValidator('#email')(validateEmail),
  getValueValidator('#country')(validateCountry),
  getValueValidator('#postalcode')(validatePostalCode),
  getValueValidator('#phone')(validatePhone),
  getValueValidator('#creditcard')(validateCreditCard),
  getValueValidator('#cvv')(validateCVV),
  getValueValidator('#expdate')(validateExpDate),
]

const form = getElement('#order-form')

if (form) {
  const formElements = Array.prototype.slice.call(form.elements)
  const resetForm = () => {
    formElements.forEach((input) => {
      input.classList.remove('error')
    })
  }
  formElements.forEach((input) => {
    getInputBroadcaster('keydown')(keydownListener)(input)
    getInputBroadcaster('input')(resetForm)(input)
  })

  form.onsubmit = (e) => {
    e.preventDefault()

    resetForm()
    let isFormValid = false

    for (const fn of validators) {
      isFormValid = fn()

      if (!isFormValid) {
        break
      }
    }

    if (isFormValid) {
      form.submit()
    }
  }
}
