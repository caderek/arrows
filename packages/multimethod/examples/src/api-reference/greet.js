const { multi, method } = require('@arrows/multimethod')

class Enemy {}
const is = (prototype) => (value) => value instanceof prototype

const greet = multi((person) => person)

// Matches, when case function executed with initial arguments returns truthy value
const extendedGreet = method(is(Enemy), 'Goodbye!')(greet)

console.log(
  extendedGreet(new Enemy()), // -> 'Goodbye!'
)
