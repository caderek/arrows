import { method, multi, Multi } from '@arrows/multimethod'

/**
 * Component functions with type aliases.
 */
type MultiplyNumber = (times: number, x: number) => number
const multiplyNumber: MultiplyNumber = (times, x) => x * times

type MultiplyString = (times: number, x: string) => string
const multiplyString: MultiplyString = (times, x) => x.repeat(times)

/**
 * Multimethod type defined by intersecting existing types.
 *
 * Using intersection with `Multi` type guarantees that the multimethod will
 * be recognized correctly when extended by `fromMulti` function.
 */
type Multiply = Multi & MultiplyNumber & MultiplyString

const multiply: Multiply = multi(
  (times: number, x: any): string => typeof x,
  method('number', multiplyNumber),
  method('string', multiplyString),
)

console.log(
  multiply(3, 3), // -> 9
  multiply(3, 'foo'), // -> "foofoofoo"
  // multiply(3, [1, 2, 3]), // compiler error
)

export { multiplyNumber, multiplyString, Multiply }
export default multiply
