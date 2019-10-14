const { multi, method, fromMulti } = require('@arrows/multimethod')

const add = multi(
  (a, b) => [typeof a, typeof b],
  method(['number', 'number'], (a, b) => a + b),
  method(['string', 'string'], (a, b) => `${a}${b}`),
)

const extendedAdd = fromMulti(
  method(['bigint', 'bigint'], (a, b) => a + b),
  method(['number', 'bigint'], (a, b) => BigInt(a) + b),
  method(['bigint', 'number'], (a, b) => a + BigInt(b)),
)(add)

console.log(
  extendedAdd(1, 2), // -> 3
  extendedAdd('foo', 'bar'), // -> 'foobar'
  extendedAdd(2n, 3n), // -> 5n
  extendedAdd(5, 5n), // -> 10n
  extendedAdd(9n, 2), // -> 11n
)
