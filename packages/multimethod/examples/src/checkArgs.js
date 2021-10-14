const { multi, method, _ } = require('@arrows/multimethod')

/**
 * Function with case values containing wildcards.
 * These values always resolve to true.
 *
 * @param {any} a
 * @param {any} b
 * @param {any} c
 * @returns {string}
 */
const checkArgs = multi(
  (...args) => args.map((arg) => typeof arg),

  // Skipping check on the first argument
  method([_, 'function', 'function'], () => {
    throw new Error('To many functions')
  }),

  // Skipping check on the second argument
  method(['object', _, 'function'], () => {
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
