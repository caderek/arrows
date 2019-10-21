const { chain } = require('../../lib/index')

const wrappingFn = (fn, input) => {
  console.log(input)
  return fn(input)
}

const pipeWithLog = chain(wrappingFn)

// prettier-ignore
const calculate = pipeWithLog(
  (x) => x + 1,
  (x) => x * 2,
)

console.log(calculate(0))

// -> 0
// -> 1
// -> 2 (final result)
