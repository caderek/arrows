import { fromMulti, method } from '@arrows/multimethod'
import baseMultiply, { Multiply as BaseMultiply } from './intersection-multiply'

type MultiplyBigInt = (times: number, x: bigint) => bigint
const multiplyBigInt: MultiplyBigInt = (times, x) => x * BigInt(times)

/**
 * Multimethod type defined by intersection of existing types.
 */
type Multiply = BaseMultiply & MultiplyBigInt

// prettier-ignore
const multiply: Multiply = fromMulti(
  method('bigint', multiplyBigInt),
)(baseMultiply)

console.log(
  multiply(3, 3), // -> 9
  multiply(3, 'foo'), // -> "foofoofoo"
  // @ts-ignore
  multiply(3, 5n), // -> 15n
  // multiply(3, [1, 2, 3]), // compiler error
)
