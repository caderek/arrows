import { method, multi, Multi } from '../../../src/index'
/**
 * Multimethod type defined using interface.
 *
 * Extending `Multi` type guarantees that the multimethod will
 * be recognized correctly when extended by `fromMulti` function.
 */

interface IMultiply extends Multi {
  (times: number, x: number): number
  (times: number, x: string): string
}

const multiply: IMultiply = multi(
  (times: number, x: any): string => typeof x,
  method('number', (times: number, x: number): number => x * times),
  method('string', (times: number, x: string): string => x.repeat(times)),
)

console.log(
  multiply(3, 3), // -> 9
  multiply(3, 'foo'), // -> "foofoofoo"
  // multiply(3, [1, 2, 3]), // compiler error
)

export { IMultiply }
export default multiply
