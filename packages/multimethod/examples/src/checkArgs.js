const { multi, method, __ } = require('@arrows/multimethod')
/**
 * Function with case values containing wildcards.
 * These values always resolve to true.
 *
 * @param {RegExp} pattern
 * @returns {string} type
 */
const checkArgs = multi(
  (...args) => args.map((arg) => typeof arg),

  method([__, 'function', 'function'], () => {
    throw new Error('To many functions')
  }),

  method(['object', __, 'function'], () => {
    throw new Error('Wrong combination')
  }),

  method((a, b, c) => 'ok'),
)

console.log(
  //   checkArgs(
  //     1,
  //     () => 2,
  //     () => 3,
  //   ), // -> Error: To many functions
  //   checkArgs({ id: 1 }, 2, () => 3), // -> Error: Wrong combination
  checkArgs(1, { id: 2 }, () => 3), // -> "ok"
)
