import { multimethodKey } from './internal/multimethod'
import { Multimethod } from './internal/types'
import { NoArgumentsError, NotMultimethodError } from './errors'

/**
 * Retrieves the object with building blocks of the multimethod.
 *
 * You should not mutate any of its values.
 *
 * @param multimethod
 * @returns Inspection object
 */
const inspect = (multimethod: Multimethod) => {
  if (multimethod === undefined) {
    throw new NoArgumentsError()
  }

  if (multimethod[multimethodKey] === undefined) {
    throw new NotMultimethodError()
  }

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
