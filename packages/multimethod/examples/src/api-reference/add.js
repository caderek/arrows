const { multi, method } = require('@arrows/multimethod')

const add = multi((a, b) => [typeof a, typeof b])

const extendedAdd = method(['number', 'number'], (a, b) => a + b)(add)

console.log(
  extendedAdd(1, 2), // -> 3
)
