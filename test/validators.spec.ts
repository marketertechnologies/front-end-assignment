// import test from 'japa'
// import { testBooleanFunction, TestCase, testWithCases } from '../lib/test-utils'
// import {
//   isString,
//   isAlphabetic,
//   validateFirstname,
//   validateLastname,
//   validateEmail,
//   validateCountry,
//   validatePostalCode,
//   validatePhone,
//   validateCreditCard,
//   validateCVV,
//   validateExpDate,
// } from '../frontend/assets/js/validators'

// const commonCasesMap: Record<string, TestCase> = {
//   alphabeticString: ['somestring', true, 'alphabetic string'],
//   number: [5, false, 'number'],
//   emptyString: ['', false, 'empty string'],
//   whitespace: [' ', false, 'whitespace'],
//   stringWithNumber: ['a3b', false, 'string with number'],
//   stringWhithWhitespace: ['a b', false, 'string with whitespace'],
//   oversizeString: [
//     'someverylongstringlongerthenfiftycharactersthatcannotberealfirstname',
//     false,
//     'string loner then 50 characters',
//   ],
// }

// const commonCases = [
//   commonCasesMap.number,
//   commonCasesMap.emptyString,
//   commonCasesMap.whitespace,
//   commonCasesMap.stringWithNumber,
//   commonCasesMap.stringWhithWhitespace,
// ]

// const stringCases = [
//   commonCasesMap.alphabeticString,
//   commonCasesMap.number,
//   commonCasesMap.emptyString,
//   commonCasesMap.whitespace,
// ]

// const nameCases = [
//   commonCasesMap.alphabeticString,
//   commonCasesMap.oversizeString,
//   ...commonCases,
// ]

// test.group('isString', () => {
//   testWithCases(...testBooleanFunction(isString), stringCases)
// })

// test.group('isAlphabetic', () => {
//   const cases: TestCase[] = [
//     commonCasesMap.alphabeticString,
//     commonCasesMap.stringWithNumber,
//     commonCasesMap.stringWhithWhitespace,
//     commonCasesMap.oversizeString,
//   ]

//   testWithCases(...testBooleanFunction(isAlphabetic), cases)
// })

// test.group('validateFirstname', () => {
//   testWithCases(...testBooleanFunction(validateFirstname), nameCases)
// })

// test.group('validateLastname', () => {
//   testWithCases(...testBooleanFunction(validateLastname), nameCases)
// })

// test.group('validateEmail', () => {
//   const cases: TestCase[] = [
//     ['use@exampl.com', true, 'well formed email'],
//     ['user.name@example.com', true, 'email containing dot'],
//     ...commonCases,
//   ]

//   testWithCases(...testBooleanFunction(validateEmail), cases)
// })

// test.group('validateCountry', () => {
//   testWithCases(...testBooleanFunction(validateCountry), stringCases)
// })

// test.group('validatePostalCode', () => {
//   const cases: TestCase[] = [
//     ['12345', true, 'well formed postal code'],
//     ['1234', false, 'less then five'],
//     ['123456', false, 'more then five'],
//     ...commonCases,
//   ]

//   testWithCases(...testBooleanFunction(validatePostalCode), cases)
// })

// test.group('validatePhone', () => {
//   const cases: TestCase[] = [
//     ['1234567890', true, 'ten numbers'],
//     ['12345678', true, 'between ten and seven numbers'],
//     ['123456', false, 'less then seven'],
//     ['12345678910', false, 'more then ten'],
//     ...commonCases,
//   ]

//   testWithCases(...testBooleanFunction(validatePhone), cases)
// })

// test.group('validateCreditCard', () => {
//   const cases: TestCase[] = [
//     ['1234567890123456', true, 'sixteen numbers'],
//     ['123456', false, 'less then sixteen'],
//     ['123456789101234567', false, 'more then sixteen'],
//     ...commonCases,
//   ]

//   testWithCases(...testBooleanFunction(validateCreditCard), cases)
// })

// test.group('validateCVV', () => {
//   const cases: TestCase[] = [
//     ['123', true, 'three numbers'],
//     ['12', false, 'less then three'],
//     ['1234', false, 'more then three'],
//     ...commonCases,
//   ]

//   testWithCases(...testBooleanFunction(validateCVV), cases)
// })

// test.group('validateExpDate', () => {
//   const cases: TestCase[] = [
//     ['12/35', true, 'well formed exp date'],
//     ['22/33', false, 'wrong month'],
//     ['2233', false, 'no slash'],
//     ...commonCases,
//   ]

//   testWithCases(...testBooleanFunction(validateExpDate), cases)
// })
