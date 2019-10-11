const { multi, method } = require('@arrows/multimethod')

/**
 * Classic recursive fibonacci.
 * Do not use it for big numbers.
 *
 * As you can see, recursion works just like with ordinary functions.
 *
 * @param {number} n
 * @returns {number} Nth element of fibonacci sequence
 */
const fib = multi(
  method(0, 0),
  method(1, 1),
  method((n) => fib(n - 1) + fib(n - 2)),
)

console.log(
  fib(0), // -> 0
  fib(1), // -> 1
  fib(9), // -> 34
)
