import pipe from '@arrows/composition/pipe'
import { Method, Multimethod } from './internal/types'

/**
 * Allows to create new multimethods from existing ones in a simple way.
 *
 * @param {...Method} [methods] Arbitrary number of partially applied methods
 * @param {Multimethod} multimethod Multimethod on which you want to base new multimethod
 * @returns {Multimethod} New multimethod (the base one is unchanged)
 *
 *
 * @example <caption>Interface:</caption>
 * (method1, method2?, ..., methodN?) => (multimethod) => new_multimethod
 *
 * @example <caption>Create new multimethod using existing one as a base:</caption>
 *
 * const add = multi(
 *   (a, b) => [typeof a, typeof b],
 *   method(['number', 'number'], (a, b) => a + b),
 *   method(['string', 'string'], (a, b) => `${a}${b}`),
 * )
 *
 * const extendedAdd = fromMulti(
 *   method(['bigint', 'bigint'], (a, b) => a + b),
 *   method(['number', 'bigint'], (a, b) => BigInt(a) + b),
 *   method(['bigint', 'number'], (a, b) => a + BigInt(b)),
 * )(add)
 *
 * extendedAdd(1, 2) // -> 3
 * extendedAdd('foo', 'bar') // -> 'foobar'
 * extendedAdd(2n, 3n) // -> 5n
 * extendedAdd(5, 5n) // -> 10n
 * extendedAdd(9n, 2) // -> 11n
 *
 * @see multi, method
 */
const fromMulti = (...methods: Method[]) => (multimethod: Multimethod) => {
  // Reverse, so while new methods have higher priority than the old ones
  // (because they are added to dhe front),
  // they still have natural order inside this function
  return pipe(...methods.reverse())(multimethod)
}

export { fromMulti }
export default fromMulti
