import compose from '@arrows/composition/compose'
import { Method, Multimethod } from './internal/types'

/**
 * Creates a new multimethods from the existing ones,
 * convenient for adding multiple methods.
 */
const fromMulti = (...methods: Method[]) => (multimethod: Multimethod) => {
  return compose(...methods)(multimethod)
}

export { fromMulti }
export default fromMulti
