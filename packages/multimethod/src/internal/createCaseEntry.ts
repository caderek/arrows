import isConstructor from './isConstructor'
import { CaseEntry, MixedCaseEntry } from './types'
import __, { _in, _not, _notIn, _skip } from '../__'
import { notDeepEqual } from 'assert'

type CreateCaseEntry = (caseValue: any) => CaseEntry

const createCaseEntry: CreateCaseEntry = (caseValue) => {
  if (caseValue.type === _skip) {
    return { type: 'skip' }
  }

  if (caseValue.type === _not) {
    return { type: 'not', value: caseValue.value }
  }

  if (caseValue.type === _in) {
    return { type: 'in', value: caseValue.values }
  }

  if (caseValue.type === _notIn) {
    return { type: 'notIn', value: caseValue.values }
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
        return item.type === _skip
          ? { type: 'skip' }
          : item.type === _not
          ? { type: 'not', value: item.value }
          : item.type === _in
          ? { type: 'in', value: item.values }
          : item.type === _notIn
          ? { type: 'notIn', value: item.values }
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
