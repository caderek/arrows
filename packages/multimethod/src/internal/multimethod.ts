import * as equal from 'fast-deep-equal'
import pipe from '@arrows/composition/pipe'
import {
  Dispatch,
  Multi,
  Method,
  MethodEntry,
  MethodEntries,
  DefaultMethod,
} from './types'

const multimethodKey = Symbol('multimethod')
const methodKey = Symbol('method')

type CountSegments = (dispatch: Dispatch) => number

const countSegments: CountSegments = (dispatch) => {
  let count = 1
  let current = dispatch

  try {
    while (typeof current === 'function') {
      const next = current()
      if (typeof next === 'function') {
        count++
        current = next
      } else {
        return count
      }
    }
  } catch {}

  return count
}

type CreateSimpleTarget = (
  methodEntries: MethodEntries,
  defaultMethod: DefaultMethod,
  dispatch: Dispatch,
) => Dispatch

const createSimpleTarget: CreateSimpleTarget = (
  methodEntries,
  defaultMethod,
  dispatch,
) => {
  const fn = (...args) => {
    let currentDispatchValue = dispatch(...args)

    const entry = methodEntries.find(([dispatchValue]) => {
      // @todo optimize this by preselecting if this check if needed,
      // when multimethod is created
      // @todo use dep strict equal only when needed
      return typeof dispatchValue === 'function'
        ? dispatchValue(currentDispatchValue)
        : equal(dispatchValue, currentDispatchValue)
    })

    const target = entry ? entry[1] : defaultMethod

    // @todo optimize this by preselecting if this check if needed,
    // when multimethod is created
    // @todo refactor into function
    if (!entry && target === null) {
      throw new Error('No method specified for provided arguments')
    }

    if (typeof target !== 'function') {
      return target
    }

    return target(...args)
  }

  Object.defineProperty(fn, 'length', { value: dispatch.length })

  return fn
}

type CreateSegmentedTarget = (
  methodEntries: MethodEntries,
  defaultMethod: DefaultMethod,
  dispatch: Dispatch,
  segmentsCount: number,
) => Dispatch

const createSegmentedTarget: CreateSegmentedTarget = (
  methodEntries,
  defaultMethod,
  dispatch,
  segmentsCount,
) => {
  const recur = (counter, previousSegmentsArgs = []) => {
    if (counter === 1) {
      return (...args) => {
        const segmentsArgs = [...previousSegmentsArgs, args]
        let count = segmentsArgs.length

        let currentDispatchValue = dispatch

        for (let i = 0; i < count; i++) {
          currentDispatchValue = currentDispatchValue(...segmentsArgs[i])
        }

        const entry = methodEntries.find(([dispatchValue]) =>
          equal(dispatchValue, currentDispatchValue),
        )

        const target = entry ? entry[1] : defaultMethod

        if (!entry && target === null) {
          throw new Error('No method specified for provided arguments')
        }

        if (typeof target !== 'function') {
          return target
        }

        let result: any = target

        for (let i = 0; i < count; i++) {
          result = result(...segmentsArgs[i])
        }

        return result
      }
    }

    const fn = (...args) => {
      return recur(counter - 1, [...previousSegmentsArgs, args])
    }

    Object.defineProperty(fn, 'length', { value: dispatch.length })

    return fn
  }

  return recur(segmentsCount)
}

const validateFirstArg = (arg) => {
  if (typeof arg !== 'function' && arg !== undefined) {
    throw new Error(
      'First argument of multi must be either dispatch function or partially applied method',
    )
  }
}

const validateOtherArgs = (args) => {
  args.forEach((item) => {
    if (typeof item !== 'function' || item[methodKey] !== true) {
      throw new Error(
        'Second or further argument of multi must be a partially applied method',
      )
    }
  })
}

type IsDispatchProvided = (fn: Function) => boolean

const isDispatchProvided: IsDispatchProvided = (item) =>
  typeof item === 'function' && !item[methodKey] === true

type CreateMultimethod = (
  methodEntries?: MethodEntries,
) => (defaultMethod?: DefaultMethod) => Multi

const createMultimethod: CreateMultimethod = (methodEntries = []) => (
  defaultMethod = null,
) => (...args) => {
  const [first, ...rest] = args

  validateFirstArg(first)
  validateOtherArgs(rest)

  const haveDispatchFn = isDispatchProvided(first)
  const dispatch = haveDispatchFn ? first : (x) => x
  const methods = haveDispatchFn ? rest : args

  const segmentsCount = countSegments(dispatch)

  const resultFn =
    segmentsCount === 1
      ? createSimpleTarget(methodEntries, defaultMethod, dispatch)
      : createSegmentedTarget(
          methodEntries,
          defaultMethod,
          dispatch,
          segmentsCount,
        )

  resultFn[multimethodKey] = {
    methodEntries,
    defaultMethod,
    dispatch,
  }

  if (methods.length !== 0) {
    return pipe(...methods)(resultFn)
  }

  return resultFn
}

type AddEntry = (
  methodEntries: MethodEntries,
  newMethodEntry: MethodEntry,
) => MethodEntries

const addEntry: AddEntry = (methodEntries, newMethodEntry) => {
  const index = methodEntries.findIndex((entry) =>
    equal(entry[0], newMethodEntry[0]),
  )

  if (index === -1) {
    return [...methodEntries, newMethodEntry]
  }

  const newMethodEntries = [...methodEntries]
  newMethodEntries[index] = newMethodEntry

  return newMethodEntries
}

export { createMultimethod, addEntry, multimethodKey, methodKey }
