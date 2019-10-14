import compose from '@arrows/composition/compose'
import { Method, Multimethod } from './internal/types'

/**
 * Allows to create new multimethods from existing ones in a simple way.
 */
const fromMulti = (...methods: Method[]) => (multimethod: Multimethod) => {
  return compose(...methods)(multimethod)
}

export { fromMulti }
export default fromMulti
