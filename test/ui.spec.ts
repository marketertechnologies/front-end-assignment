import test from 'japa'
import {
  getElementByText,
  getPage,
  t,
  TestCase,
  testWithCases,
} from '../lib/test-utils'

interface ExpectedAttributes {
  id: string
  name: string
  label: string
  type: string
  class: string[]
  placeholder?: string
  options?: { value: string; label: string }[]
  icon?: string
}

test.group('Index page', () => {
  const indexPageCases: TestCase[] = [
    ['More Bacon', 'button'],
    ['Checkout', 'button'],
  ]

  testWithCases(
    t`${0} button is present on index page and has "${1}" class`,
    async (value, expected, assert) => {
      const { document } = await getPage('/')

      const btn = getElementByText(document, value, 'a')

      assert.exists(btn)
      assert.equal(btn.classList.value, expected)
    },
    indexPageCases
  )
})

test.group('Checkout page', (group) => {
  const headingsCases: TestCase[] = [
    ['Personal information', ['.circle'], 'number icon'],
    ['Payments details', ['.circle', '.lock-icon'], 'number and lock icons'],
  ]
  let document: Document
  let details: HTMLElement[][]

  group.before(async () => {
    const window = await getPage('/checkout')
    document = window.document
    const labels = Array.prototype.slice.call(
      document.querySelectorAll('.order div:nth-child(odd)')
    )
    const prices = Array.prototype.slice.call(
      document.querySelectorAll('.order div:nth-child(even)')
    )
    details = labels.map((label, index) => [label, prices[index]])
  })

  testWithCases(
    t`Heading "${0}" is present and has ${2}`,
    (value, expected, assert) => {
      const element = getElementByText(
        document,
        value,
        'h5'
      ) as HTMLHeadingElement

      assert.exists(element)

      for (const selector of expected) {
        const icon = element.querySelector(selector)!

        assert.exists(icon)
      }
    },
    headingsCases
  )

  const inputsCases: TestCase[] = [
    [
      'firstname',
      {
        id: 'firstname',
        name: 'firstName',
        type: 'text',
        label: 'First name',
        placeholder: 'Elon',
        class: ['input', 'perversed'],
      },
    ],
    [
      'lastname',
      {
        id: 'lastname',
        name: 'lastName',
        type: 'text',
        label: 'Last name',
        placeholder: 'Musk',
        class: ['input', 'perversed'],
      },
    ],
    [
      'email',
      {
        id: 'email',
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'elon@spacex.com',
        class: ['input'],
      },
    ],
    [
      'country',
      {
        id: 'country',
        name: 'country',
        type: 'select-one',
        label: 'Contry',
        class: ['input'],
        options: [
          { value: 'US', label: 'United States' },
          { value: 'RU', label: 'Russia' },
          { value: 'CH', label: 'China' },
        ],
      },
    ],
    [
      'postalcode',
      {
        id: 'postalcode',
        name: 'postalCode',
        type: 'text',
        label: 'Postal Code',
        placeholder: '10001',
        class: ['input'],
      },
    ],
    [
      'phone',
      {
        id: 'phone',
        name: 'phone',
        type: 'text',
        label: 'Phone Number',
        placeholder: '(212) 692-93-92',
        class: ['input'],
      },
    ],
    [
      'creditcard',
      {
        id: 'creditcard',
        name: 'creditCard',
        type: 'text',
        label: 'Credit Card Number',
        placeholder: '0000 \u2013 0000 \u2013 0000 \u2013 0000',
        class: ['input'],
      },
    ],
    [
      'cvv',
      {
        id: 'cvv',
        name: 'CVV',
        type: 'text',
        label: 'Security code',
        placeholder: '***',
        class: ['input'],
      },
    ],
    [
      'expdate',
      {
        id: 'expdate',
        name: 'expDate',
        type: 'text',
        label: 'Expiration date',
        placeholder: 'MM / YY',
        class: ['input'],
      },
    ],
  ]

  testWithCases(
    t`Element with id ${0} is present on checkout page an has appropriated attributes`,
    (id: string, expected: ExpectedAttributes, assert) => {
      // whole input component
      const element = document.querySelector(`label[for="${id}"]`)

      assert.exists(element)
      for (const className of expected.class) {
        assert.isTrue(element?.classList.contains(className))
      }

      // label
      const labelElement = element?.querySelector('.label')
      assert.strictEqual(expected.label, labelElement?.innerHTML)

      // input
      const inputElement = element?.querySelector(
        `#${expected.id}`
      ) as HTMLInputElement
      assert.exists(inputElement)
      assert.strictEqual(expected.name, inputElement?.getAttribute('name'))
      assert.strictEqual(expected.type, inputElement?.type)
      if (expected.placeholder) {
        assert.strictEqual(
          expected.placeholder,
          inputElement?.getAttribute('placeholder')
        )
      }

      // if element is select
      if (expected.options) {
        const options: HTMLOptionElement[] = Array.prototype.slice.call(
          (inputElement as never as HTMLSelectElement).options
        )

        for (const option of expected.options) {
          assert.exists(options.find((o) => o.value === option.value))
        }
      }

      // if element has icon
      if (expected.icon) {
        const icon = element?.querySelector(expected.icon)

        assert.exists(icon)
      }
    },
    inputsCases
  )

  test('Your order heading is present', (assert) => {
    const heading = getElementByText(document, 'Your order', 'h5')

    assert.exists(heading)
  })

  const detailsLabels = [
    'Apple Watch Sport',
    'Modern Buckle',
    'Total purchases',
    'Estimated tax',
    'Total',
  ]
  const detailsPrices = ['$ 580', '$ 380', '$ 960.00', '$ 0', '$ 960']

  test('Order details are present', (assert) => {
    for (const [label, price] of details) {
      const labelText = label.innerHTML
      const priceText = price.innerHTML
      assert.isTrue(detailsLabels.includes(labelText))
      assert.isTrue(detailsPrices.includes(priceText))
    }
  })

  test('Checkout button is present and has icon', (assert) => {
    const btn = document.querySelector(
      '.complete-purchase button'
    ) as HTMLButtonElement

    assert.exists(btn)
    assert.exists(btn.querySelector('.shopping-cart'))
  })
})
