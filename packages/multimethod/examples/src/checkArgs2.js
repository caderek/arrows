const { multi, method, _ } = require('@arrows/multimethod')

/* Custom predicates */
const not = (y) => (x) => x !== y
const notIn = (...args) => (x) => !args.includes(x)

/**
 * Function with case value ans an array
 * that contains predicate functions.
 *
 * Very powerful when paired with wildcards.
 *
 * @param {any} a
 * @param {any} b
 * @returns {string}
 */
const checkArgs2 = multi(
  (a, b) => [typeof a, typeof b],

  method([not('number'), _], () => {
    throw new Error('First argument should be a number')
  }),

  method([_, notIn('string', 'number')], () => {
    throw new Error('Second argument should be a number or a string')
  }),

  method((a, b) => 'ok'),
)

console.log(
  // checkArgs2('a', 1), // -> Error: First argument should be a number
  // checkArgs2(1, [2, 3]), // -> Error: Second argument should be a number or a string
  checkArgs2(1, 2), // -> "ok"
  checkArgs2(5, 'b'), // -> "ok"
)
