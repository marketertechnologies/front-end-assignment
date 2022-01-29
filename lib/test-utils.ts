import test from 'japa'
import { Assert } from 'japa/build/src/Assert'
import { JSDOM } from 'jsdom'
import supertest from 'supertest'

export const t = (strings: TemplateStringsArray, ...keys: number[]) => {
  return (...values: any[]) => {
    var dict = values[values.length - 1] || {}
    var result = [strings[0]]
    keys.forEach((key, i) => {
      var value = Number.isInteger(key) ? values[key] : dict[key]
      result.push(value, strings[i + 1])
    })

    return result.join('')
  }
}

export type TestCase = [any, any, string?]
export type TestCallback = (v: TestCase[0], e: TestCase[1], a: Assert) => void
export type Template = ReturnType<typeof t>

export const testWithCases = (
  msgTemplate: Template,
  fn: TestCallback,
  cases: TestCase[]
) => {
  for (const [value, expect, useCase] of cases) {
    test(msgTemplate(value, expect, useCase), async (assert) => {
      await fn(value, expect, assert)
    })
  }
}

export const testBooleanFunction = (
  fn: (...args: any[]) => void
): [Template, TestCallback] => [
  t`returns ${1} for ${2}`,
  (value, expect, assert) => {
    assert.strictEqual(fn(value), expect)
  },
]

export const getPage = async (path: string) => {
  const { text } = await supertest(
    `http://${process.env.HOST}:${process.env.PORT}`
  )
    .get(path)
    .expect(200)

  return new JSDOM(text).window
}

export const getElementByText = (
  document: Document,
  text: string,
  tag = 'div'
): HTMLElement => {
  const expression = `//${tag}[contains(., "${text}")]`
  const results = document.evaluate(expression, document, null, 0)

  return results.iterateNext() as HTMLElement
}

export const findElementsByText = (
  document: Document,
  text: string,
  selector = 'div'
) => {
  const results = document.querySelectorAll(selector)
  const elements = Array.prototype.filter.call(results, (e) =>
    e.innerText.contains(text)
  )

  return elements
}
