const { curry } = require('../../lib/index')

const rawAdd = (a, b) => a + b

const add = curry(rawAdd)

console.log(
  add(1, 2), // -> 3
  add(1)(2), // -> 3
)
