const { multi, method, __ } = require('@arrows/multimethod')
/**
 * Function with case values containing wildcard methods.
 *
 * @param {RegExp} pattern
 * @returns {string} type
 */
const checkArgs2 = multi(
  (a, b, c) => [typeof a, typeof b],

  method([__.not('number'), __], () => {
    throw new Error('First argument should be a number')
  }),

  method([__, __.notIn('string', 'number')], () => {
    throw new Error('Second argument should be a number or a string')
  }),

  method((a, b, c) => 'ok'),
)

console.log(
  // checkArgs2('a', 1), // -> Error: First argument should be a number
  // checkArgs2(1, [2, 3]), // -> Error: Second argument should be a number or a string
  checkArgs2(1, 2), // -> "ok"
  checkArgs2(5, 'b'), // -> "ok"
)
