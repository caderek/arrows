const { multi, method } = require('@arrows/multimethod')

const baseAdd = multi(
  (a, b) => [typeof a, typeof b],
  method(['number', 'number'], (a, b) => a + b),
  method(['string', 'string'], (a, b) => `${a}${b}`),
)

/**
 * Creating new multimethod with additional method
 */
const add = method(['bigint', 'bigint'], (a, b) => a + b)(baseAdd)

console.log(
  add(1, 2), // -> 3
  add('bat', 'man'), // -> "batman"
  add(1n, 2n), // -> 3n
)
