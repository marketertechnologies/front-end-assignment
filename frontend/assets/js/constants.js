export const allowedKeys = [
  'Backspace',
  'Tab',
  'Enter',
  'ArrowLeft',
  'ArrowRight',
]

export const charPatternsMap = {
  firstname: /[a-zA-Z]/,
  lastname: /[a-zA-Z]/,
  email: /[0-9a-zA-Z\.\@\-_]/,
  country: /[a-zA-Z]/,
  postalcode: /[0-9]/,
  phone: /[0-9]/,
  creditcard: /[0-9]/,
  cvv: /[0-9]/,
  expdate: /[0-9\/]/,
}
