import addEntry from './internal/addEntry'
import {
  createMultimethod,
  methodKey,
  multimethodKey,
} from './internal/multimethod'
import { Method, MethodEntries, Multimethod } from './internal/types'

/**
 * Adds method to a multimethod
 *
 * @param {any} [caseValue] The value to which the result of dispatch function is matched
 *   - if function, then is executed with input arguments (always unchunked, even if dispatch is chunked,
 *   - if constructor, then is matched by reference value first, if that fails, by instanceof operator.
 * @param {any} correspondingValue The value that function should return on matching case
 *   - if function, then is executed with input arguments (chunked or unchunked, depending on the dispatch function)
 * @param {Multimethod} multimethod Multimethod on which you want to base the new multimethod
 * @returns {Multimethod} New multimethod (the base one is unchanged)
 *
 * @example <caption>Interface:</caption>
 * (caseValue?, correspondingValue) => (multimethod) => new_multimethod
 *
 *
 * @example <caption>Default method as function:</caption>
 *
 * const sayHello = multi((user) => user.lang)
 *
 * const sayHelloWithDefault = method((user) => `Hello ${usr.name}!`)(sayHello)
 *
 * sayHelloWithDefault({ name: 'Alejandro', lang: 'es' }) // -> 'Hello Alejandro!'
 *
 *
 * @example <caption>Default method as other value:</caption>
 *
 * const sayHello = multi(() => user.lang)
 *
 * const sayHelloWithDefault = method('Hello!')(sayHello)
 *
 * sayHelloWithDefault({ name: 'Alejandro', lang: 'es' }) // -> 'Hello!'
 *
 *
 * @example <caption>Case method with caseValue as ordinary value and correspondingValue as a function:</caption>
 *
 * const add = multi((a, b) => [(typeof a), (typeof b)])
 *
 * const extendedAdd = method(['number', 'number'], (a, b) => a + b)(add)
 *
 * extendedAdd(1, 2) // -> 3
 *
 *
 * @example <caption>Case method with caseValue and correspondingValue as ordinary values:</caption>
 *
 * const getHexColor = multi() // Uses default dispatch
 *
 * const extendedGetHexColor = method('red', '#FF0000')(getHexColor)
 *
 * extendedGetHexColor('red') // -> '#FF0000'
 *
 *
 * @example <caption>Case method with caseValue as a function and correspondingValue as ordinary value:</caption>
 *
 * class Enemy {}
 * const is = (prototype) => (value) => value instanceof prototype
 *
 * const greet = multi() // Uses default dispatch
 *
 * // Matches, when case function executed with initial arguments returns truthy value
 * const extendedGreet = method(is(Enemy), 'Goodbye!')(greet)
 *
 * extendedGreet(new Enemy()) // -> 'Goodbye!'
 *
 *
 * @example <caption>Case method with caseValue and correspondingValue as functions:</caption>
 *
 * class Car { drive() { return 'driving...' } }
 * class Human { walk() { return 'walking...' } }
 * const is = (prototype) => (value) => value instanceof prototype
 *
 * const go = multi(
 *   method(is(Car), (entity) => entity.drive()) // lets add one case to original multimethod
 * )
 *
 * const extendedGo = method(is(Human), (entity) => entity.walk())(go)
 *
 * extendedGo(new Car()) // -> 'driving...'
 * extendedGo(new Human()) // -> 'walking...'
 *
 *
 * @example <caption>Case method with caseValue as a constructor:</caption>
 *
 * class Email {}
 * class SMS {}
 *
 * const fn = multi(
 *   method(Email, 'email') // lets add one case to original multimethod
 * )
 *
 * const extendedFn = method(SMS, 'sms')(go)
 *
 * extendedFn(new Email()) // -> 'email'
 * extendedFn(new SMS()) // -> 'sms'
 */
const method: Method = (caseValue, correspondingValue) => {
  const partialMethod = (multimethod: Multimethod): Multimethod => {
    if (!multimethod[multimethodKey]) {
      throw new Error('Function is not a multimethod')
    }

    const first = caseValue
    const second = correspondingValue
    const isNotDefault = second !== undefined
    const fn = isNotDefault ? second : first
    const dispatchValues = isNotDefault ? first : null

    const { methodEntries, defaultMethod, dispatch } = multimethod[
      multimethodKey
    ]

    if (isNotDefault) {
      const newMethodEntries: MethodEntries = addEntry(
        methodEntries,
        dispatchValues,
        fn,
      )

      return createMultimethod(newMethodEntries)(defaultMethod)(dispatch)
    }

    return createMultimethod(methodEntries)(fn)(dispatch)
  }

  // @ts-ignore
  partialMethod[methodKey] = true

  return partialMethod
}

export { method }
export default method
