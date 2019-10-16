import { NotMultimethodError } from './errors'
import addEntry from './internal/addEntry'
import {
  createMultimethod,
  methodKey,
  multimethodKey,
} from './internal/multimethod'
import { MethodEntries, MethodFn, Multimethod } from './internal/types'

/**
 * Adds method to a multimethod
 */
const method: MethodFn = (caseValue, correspondingValue) => {
  const partialMethod = (multimethod: Multimethod): Multimethod => {
    if (!multimethod[multimethodKey]) {
      throw new NotMultimethodError()
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
