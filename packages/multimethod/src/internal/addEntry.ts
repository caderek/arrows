import * as equal from 'fast-deep-equal'
import createCaseEntry from './createCaseEntry'
import { MethodEntries } from './types'

type AddEntry = (
  methodEntries: MethodEntries,
  caseValue: any,
  caseCorrespondingValue: any,
) => MethodEntries

const addEntry: AddEntry = (
  methodEntries,
  caseValue,
  caseCorrespondingValue,
) => {
  const caseEntry = createCaseEntry(caseValue)

  const index = methodEntries.findIndex((entry) => equal(entry[0], caseEntry))

  const newMethodEntry: [any, any] = [caseEntry, caseCorrespondingValue]

  if (index === -1) {
    return [...methodEntries, newMethodEntry]
  }

  const newMethodEntries = [...methodEntries]
  newMethodEntries[index] = newMethodEntry

  return newMethodEntries
}

export default addEntry
