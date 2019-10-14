const { multi, method } = require('@arrows/multimethod')

/**
 * Function with case values as ordinary values.
 * Values can be any JSON-compatible, arbitrary nested structure, or primitive.
 * Matched by the deep strict equal algorithm.
 *
 * @param {Object} player
 * @returns {string} greeting
 */
const greet = multi(
  method({ name: 'John', age: '30' }, 'Hello John!'),
  method({ name: 'Jane', age: '25' }, 'Hi Jane!'),
  method('Howdy stranger!'),
)

console.log(
  greet({ name: 'John', age: '30' }), // -> "Hello John!"
  greet({ name: 'Jane', age: '25' }), // -> "Hi Jane!"
  greet({ name: 'Jane', age: '40' }), // -> "Howdy stranger!"
)
