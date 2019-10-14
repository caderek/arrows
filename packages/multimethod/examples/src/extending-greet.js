const { multi, method } = require('@arrows/multimethod')

/**
 * @param {string} language
 * @returns ${string} greeting
 */
const baseGreet = multi(
  method('ru', 'Привет!'),
  method('es', '¡Hola!'),

  method('pl', 'Cześć!'),
)

/**
 * Creating a new multimethod with added default method
 */
const greet = method('Hello!')(baseGreet)

console.log(
  greet('ru'), // -> "Привет!"
  greet('es'), // -> "¡Hola!"
  greet('pl'), // -> "Cześć!"
  greet('fr'), // -> "Hello!"
)
