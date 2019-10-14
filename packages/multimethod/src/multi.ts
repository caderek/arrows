import { createMultimethod } from './internal/multimethod'
import { Multi } from './internal/types'

/**
 * Creates multimethod - a function that can dynamically choose proper implementation,
 * based on arbitrary dispatch of its arguments
 *
 * @param {Dispatch | Multimethod | Method } first The function that calculates values for matching
 * @param {...Method} [methods] Arbitrary number of partially applied methods
 * @returns {Multimethod} Returns an immutable multimethod that can be used as ordinary function
 *
 * @example <caption>Interface:</caption>
 * (dispatch | multimethod | method, method?, method?, ..., method?) => multimethod
 *
 *
 * @example <caption>Create multimethod with a custom dispatch and no methods:</caption>
 *
 * const fn = multi(x => typeof x)
 * fn('foo') // -> throws an Error (because of no matching methods), but useful as a base for extensions
 *
 *
 * @example <caption>Create multimethod with the default dispatch and some methods:</caption>
 *
 * const makeSound = multi(
 *   method('cat', () => 'Meow!'),
 *   method('dog', () => 'Woof!'),
 *   method(() => 'Hello!'), // default method (ony one argument provided)
 * )
 *
 * makeSound('cat') // -> 'Meow!'
 * makeSound('dog') // -> 'Woof!'
 * makeSound('cow') // -> 'Hello!' (that's a rather unusual cow)
 *
 *
 * @example <caption>Create multimethod with a custom dispatch and some methods:</caption>
 *
 * const multiply = multi(
 *   (multiplier, x) => [(typeof multiplier), (typeof x)],
 *   method(['number', 'number'], (multiplier, x) => x * multiplier),
 *   method(['number', 'string'], (multiplier, x) => x.repeat(multiplier)),
 * )
 *
 * multiply(2, 5) // -> 10
 * multiply(3, 'Beetlejuice! ') // -> 'Beetlejuice! Beetlejuice! Beetlejuice! ' (do not read it out loud)
 * multiply(2, [1, 2, 3]) // -> throws an Error (no match and no default method for these arguments)
 */
const multi: Multi = createMultimethod()()

export { multi }
export default multi
