import isConstructor from './isConstructor'
import { CaseEntry, MixedCaseEntry } from './types'
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
    caseValue.some(
      (item) => isConstructor(item) || item === __ || item instanceof RegExp,
    )
  ) {
    return {
      type: 'mixed',
      values: caseValue.map((item) => {
        return item === __
          ? { type: 'skip' }
          : {
              type: isConstructor(item)
                ? 'constructor'
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
