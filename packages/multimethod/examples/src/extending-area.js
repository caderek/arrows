const { multi, method, fromMulti } = require('@arrows/multimethod')

const baseArea = multi(
  (shape) => shape.type,
  method('rectangle', (shape) => shape.a * shape.b),
  method('square', (shape) => shape.a ** 2),
)

/**
 * Creating a new multimethod with many new methods via `fromMulti` function
 */
const area = fromMulti(
  method('circle', (shape) => Math.PI * shape.r ** 2),
  method('triangle', (shape) => 0.5 * shape.a * shape.h),
)(baseArea)

console.log(
  area({ type: 'square', a: 5 }), // -> 25
  area({ type: 'circle', r: 3 }), // -> 28.274333882308138
)
