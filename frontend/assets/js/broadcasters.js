export const errorBroadcaster = (fn, onError) => {
  const valid = fn()

  if (!valid) {
    onError()
  }

  return valid
}
