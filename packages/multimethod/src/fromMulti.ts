import compose from '@arrows/composition/compose'
import { Method, Multimethod } from './internal/types'

type FromMulti = (
  ...methods: Method[]
) => (multimethod: Multimethod) => Multimethod

/**
 * Creates a new multimethods from the existing ones,
 * convenient for adding multiple methods.
 */
const fromMulti: FromMulti = (...methods) => (multimethod) => {
  return compose(...methods)(multimethod)
}

export { fromMulti }
export default fromMulti
