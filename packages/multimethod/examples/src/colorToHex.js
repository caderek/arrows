const { multi, method } = require('@arrows/multimethod')

/**
 * Function with single argument,
 * default dispatch will return that argument as-is.
 *
 * @param {string} color
 * @returns {string} hex color
 */
const colorToHex = multi(
  method('red', '#ff0000'),
  method('green', '#00ff00'),
  method('blue', '#0000ff'),
)

console.log(
  colorToHex('green'), // -> "#00ff00"
)
