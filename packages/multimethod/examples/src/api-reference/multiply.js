const { multi, method } = require('@arrows/multimethod')

const multiply = multi(
  (multiplier, x) => [typeof multiplier, typeof x],
  method(['number', 'number'], (multiplier, x) => x * multiplier),
  method(['number', 'string'], (multiplier, x) => x.repeat(multiplier)),
)

console.log(
  multiply(2, 5), // -> 10
  multiply(3, 'Beetlejuice! '), // -> 'Beetlejuice! Beetlejuice! Beetlejuice! ' (do not read it out loud)
  // multiply(2, [1, 2, 3]), // -> throws an Error (no match and no default method for these arguments)
)
