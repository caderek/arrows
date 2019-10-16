import { fromMulti, method } from '@arrows/multimethod'
import baseMultiply, { IMultiply as IBaseMultiply } from './interfaces-multiply'

/**
 * Multimethod type defined by extending existing interface.
 */
interface IMultiply extends IBaseMultiply {
  (times: number, x: bigint): bigint
}

const multiply: IMultiply = fromMulti(
  method('bigint', (times: number, x: bigint) => x * BigInt(times)),
)(baseMultiply)

console.log(
  multiply(3, 3), // -> 9
  multiply(3, 'foo'), // -> "foofoofoo"
  // @ts-ignore
  multiply(3, 5n), // -> 15n
  // multiply(3, [1, 2, 3]), // compiler error
)
