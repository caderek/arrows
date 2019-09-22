import {
  createMultimethod,
  addEntry,
  multimethodKey,
  methodKey,
} from './internal/multimethod'
import { Method, MethodEntries } from './internal/types'

const method: Method = (...args) => {
  const partialMethod = (multimethod) => {
    if (!multimethod[multimethodKey]) {
      throw new Error('Function is not a multimethod')
    }

    const [first, second] = args
    const isNotDefault = second !== undefined
    const fn = isNotDefault ? second : first
    const dispatchValues = isNotDefault ? first : null

    const { methodEntries, defaultMethod, dispatch } = multimethod[
      multimethodKey
    ]

    if (isNotDefault) {
      const newMethodEntries: MethodEntries = addEntry(methodEntries, [
        dispatchValues,
        fn,
      ])

      return createMultimethod(newMethodEntries)(defaultMethod)(dispatch)
    }

    return createMultimethod(methodEntries)(fn)(dispatch)
  }

  partialMethod[methodKey] = true

  return partialMethod
}

export { method }
export default method
