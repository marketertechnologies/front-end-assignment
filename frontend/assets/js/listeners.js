import { allowedKeys, charPatternsMap } from './constants'

export const keydownListener = (e) => {
  if (
    !allowedKeys.includes(e.key) &&
    !charPatternsMap[e.target.id].test(e.key)
  ) {
    e.preventDefault()
  }
}
