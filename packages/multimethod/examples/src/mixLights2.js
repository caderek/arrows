const { multi, method } = require('@arrows/multimethod')

/**
 * Function with custom dispatch.
 * More flexible version of the previous example.
 *
 * @param {string} colorA
 * @param {string} colorB
 * @returns {string} the resulting color
 */
const mixLights = multi(
  (colorA, colorB) => [colorA, colorB].sort(), // custom dispatch
  method(['green', 'red'], 'yellow'),
  method(['blue', 'red'], 'magenta'),
  method(['blue', 'green'], 'cyan'),
)

console.log(
  mixLights('red', 'blue'), // -> "magenta"
  mixLights('blue', 'red'), // -> "magenta"
)
