import isConstructor from './isConstructor'
import { CaseEntry } from './types'
import __ from '../__'

type CreateCaseEntry = (caseValue: any) => CaseEntry

const createCaseEntry: CreateCaseEntry = (caseValue) => {
  if (caseValue === __) {
    return { type: 'skip' }
  }

  if (isConstructor(caseValue)) {
    return { type: 'constructor', value: caseValue }
  }

  if (caseValue instanceof RegExp) {
    return { type: 'regexp', value: caseValue }
  }

  if (typeof caseValue === 'function') {
    return { type: 'function', value: caseValue }
  }

  if (
    Array.isArray(caseValue) &&
    caseValue.some((item) => isConstructor(item))
  ) {
    return {
      type: 'mixed',
      values: caseValue.map((item) => {
        return {
          type: isConstructor(item)
            ? 'constructor'
            : item === __
            ? 'skip'
            : item instanceof RegExp
            ? 'regexp'
            : 'value',
          value: item,
        }
      }),
    }
  }

  return {
    type: 'value',
    value: caseValue,
  }
}

export { CaseEntry }
export default createCaseEntry
