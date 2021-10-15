import { multimethodKey } from './internal/multimethod'
import { MethodEntries, Multimethod } from './internal/types'

/**
 * Retrieves the object with building blocks of the multimethod.
 *
 * You should not mutate any values.
 *
 * @param multimethod
 * @returns
 */
const inspect = (multimethod: Multimethod) => {
  const internals = multimethod[multimethodKey]

  const entries = [
    ...internals.methodEntries,
    [{ type: 'default' }, internals.defaultMethod],
  ]

  return {
    get dispatch() {
      return internals.dispatch
    },
    get entries() {
      return entries
    },
    get cases() {
      return entries.map(([key]) => key)
    },
    get values() {
      return entries.map(([_, value]) => value)
    },
  }
}

export default inspect
