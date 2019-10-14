const { multi, method } = require('@arrows/multimethod')

const makeSound = multi(
  method('cat', () => 'Meow!'),
  method('dog', () => 'Woof!'),
  method(() => 'Hello!'), // default method (ony one argument provided)
)

console.log(
  makeSound('cat'), // -> 'Meow!'
  makeSound('dog'), // -> 'Woof!'
  makeSound('cow'), // -> 'Hello!' (that's a rather unusual cow)
)
