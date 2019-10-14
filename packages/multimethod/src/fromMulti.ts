import compose from '@arrows/composition/compose'
import { NoArgumentsError, NotMethodError, NotMultimethodError } from './errors'
import { areMethodsValid, multimethodKey } from './internal/multimethod'
import { Method, Multimethod } from './internal/types'

type FromMulti = (
  ...methods: Method[]
) => (multimethod: Multimethod) => Multimethod

/**
 * Creates a new multimethods from the existing ones,
 * convenient for adding multiple methods.
 */
const fromMulti: FromMulti = (...methods) => (multimethod) => {
  if (methods.length === 0) {
    throw new NoArgumentsError()
  }

  if (!areMethodsValid(methods)) {
    throw new NotMethodError()
  }

  if (typeof multimethod !== 'function' || !multimethod[multimethodKey]) {
    throw new NotMultimethodError()
  }

  return compose(...methods)(multimethod)
}

export { fromMulti }
export default fromMulti
