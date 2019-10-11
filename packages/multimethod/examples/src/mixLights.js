const { multi, method } = require('@arrows/multimethod')

/**
 * Function with multiple arguments,
 * default dispatch will return the array of arguments.
 *
 * Note that the order of the arguments do matter,
 * so if you want the example to work for each combination,
 * you either have to provide methods for reversed arguments,
 * or add your custom dispatch function,
 * which returns sorted values (better option).
 *
 * @param {string} colorA
 * @param {string} colorB
 * @returns {string} the resulting color
 */
const mixLights = multi(
  method(['red', 'green'], 'yellow'),
  method(['red', 'blue'], 'magenta'),
  method(['green', 'blue'], 'cyan'),
)

console.log(
  mixLights('red', 'blue'), // -> "magenta"
  // mixLights('blue', 'red'), // -> throws an error
)
