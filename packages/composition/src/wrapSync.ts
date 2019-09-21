const wrapSync = (fn) => (input) => {
  if (input instanceof Error) {
    return input
  }

  let result

  try {
    result = fn(input)
  } catch (error) {
    result = error
  }

  return typeof result === 'undefined' ? input : result
}

export { wrapSync }
export default wrapSync
