const { multi, method } = require('@arrows/multimethod')

const mapArray = (fn) => (arr) => arr.map(fn)
const mapString = (fn) => (str) => [...str].map(fn)

/**
 * Manually curried function - each chunk has one argument.
 */
const map = multi(
  (fn) => (val) => (Array.isArray(val) ? 'array' : typeof val),
  method('array', mapArray),
  method('string', mapString),
)

console.log(
  map((char) => char.charCodeAt(0))('Hello'), // -> []
  map((item) => item * 2)([1, 2, 3]), // -> [2, 4, 6]
)
