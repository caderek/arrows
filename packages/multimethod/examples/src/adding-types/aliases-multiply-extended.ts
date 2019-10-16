import { fromMulti, method } from '@arrows/multimethod'
import baseMultiply, { Multiply as BaseMultiply } from './aliases-multiply'

/**
 * Multimethod type defined by intersection with existing type.
 */
type Multiply = BaseMultiply & {
  (times: number, x: bigint): bigint
}

const multiply: Multiply = fromMulti(
  method('bigint', (times: number, x: bigint) => x * BigInt(times)),
)(baseMultiply)

console.log(
  multiply(3, 3), // -> 9
  multiply(3, 'foo'), // -> "foofoofoo"
  // @ts-ignore
  multiply(3, 5n), // -> 15n
  // multiply(3, [1, 2, 3]), // compiler error
)
