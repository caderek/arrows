import isConstructor from './isConstructor'
import { CaseEntry } from './types'
import _ from '../_'

const createCaseEntry = (caseValue: any): CaseEntry => {
  if (caseValue === _) {
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
      (item) =>
        isConstructor(item) ||
        item === _ ||
        item instanceof RegExp ||
        typeof item === 'function',
    )
  ) {
    return {
      type: 'mixed',
      values: caseValue.map((value) => {
        if (value === _) {
          return { type: 'skip' }
        }

        if (isConstructor(value)) {
          return { type: 'constructor', value }
        }

        if (value instanceof RegExp) {
          return { type: 'regexp', value }
        }

        if (typeof value === 'function') {
          return { type: 'function', value }
        }

        return { type: 'value', value }
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
