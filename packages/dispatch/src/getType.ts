const getType = (val) => {
  if (Array.isArray(val)) {
    return 'array'
  }

  if (val === null) {
    return 'null'
  }

  if (val instanceof RegExp) {
    return 'regexp'
  }

  return typeof val
}

export default getType
