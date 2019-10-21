const { chainRight } = require('../../lib/index')

const wrappingFn = (fn, input) => {
  console.log(input)
  return fn(input)
}

const composeWithLog = chainRight(wrappingFn)

// prettier-ignore
const calculateRight = composeWithLog(
  (x) => x + 1,
  (x) => x * 2,
)

console.log(calculateRight(0))

// -> 0
// -> 0
// -> 1 (final result)
