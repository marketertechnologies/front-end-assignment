import '@fortawesome/fontawesome-free/css/fontawesome.css'
import '@fortawesome/fontawesome-free/css/regular.css'
import '@fortawesome/fontawesome-free/css/solid.css'
import '../scss/app.scss'
import { errorBroadcaster } from './broadcasters'
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
const validate = (broadcaster) => (selector) => (validator) => () => {
  const element = getElement(selector)

  return broadcaster(
    () => validator(getValue(element)),
    () => {
      element.classList.add('error')
    }
  )
}
const getValidator = validate(errorBroadcaster)

const validators = [
  getValidator('#firstname')(validateFirstname),
  getValidator('#lastname')(validateLastname),
  getValidator('#email')(validateEmail),
  getValidator('#country')(validateCountry),
  getValidator('#postalcode')(validatePostalCode),
  getValidator('#phone')(validatePhone),
  getValidator('#creditcard')(validateCreditCard),
  getValidator('#cvv')(validateCVV),
  getValidator('#expdate')(validateExpDate),
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
    input.addEventListener('input', () => {
      resetForm()
    })
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
