export const isString = (str) => !!(typeof str === 'string' && str.trim())

export const isAlphabetic = (str) => /^[a-zA-Z]{0,50}$/.test(str)

export const validateFirstname = (str) => isString(str) && isAlphabetic(str)

export const validateLastname = (str) => isString(str) && isAlphabetic(str)

export const validateEmail = (email) =>
  /^(([a-zA-Z\.\-_0-9])+@)(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/.test(email)

export const validateCountry = (country) => isString(country)

export const validatePostalCode = (postalCode) => /^[0-9]{5}$/.test(postalCode)

export const validatePhone = (phone) => /^([0-9]{0,3})?([0-9]{7})$/.test(phone)

export const validateCreditCard = (card) => /^[0-9]{16}$/.test(card)

export const validateCVV = (cvv) => /^[0-9]{3}$/.test(cvv)

export const validateExpDate = (expDate) =>
  /^[0-1]{1}[1-2]{1}\/[0-9]{2}$/.test(expDate)
