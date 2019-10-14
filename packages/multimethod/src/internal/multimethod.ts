import compose from '@arrows/composition/compose'
import * as equal from 'fast-deep-equal'
import {
  CaseEntry,
  ConstructorCaseEntry,
  DefaultMethod,
  Dispatch,
  Method,
  MethodEntries,
  Multi,
  Multimethod,
  ValueCaseEntry,
} from './types'

const multimethodKey = Symbol('multimethod')
const methodKey = Symbol('method')

type ImplicitDispatch = (...args: any[]) => any | any[]

const implicitDispatch: ImplicitDispatch = (...args) =>
  args.length > 1 ? [...args] : args[0]

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
  } catch {} // tslint:disable-line

  return count
}

const findTarget = (
  methodEntries,
  currentDispatchValue,
  args,
  defaultMethod,
) => {
  const entry = methodEntries.find(([dispatchEntry]) => {
    switch (dispatchEntry.type) {
      case 'value':
        return equal(dispatchEntry.value, currentDispatchValue)
      case 'function':
        return dispatchEntry.value(...args)
      case 'constructor':
        return (
          currentDispatchValue === dispatchEntry.value ||
          currentDispatchValue instanceof dispatchEntry.value
        )
      case 'mixed':
        return dispatchEntry.values
          .map((item: ConstructorCaseEntry | ValueCaseEntry, index: number) =>
            item.type === 'constructor'
              ? currentDispatchValue[index] instanceof item.value
              : equal(currentDispatchValue[index], item.value),
          )
          .every((matching: boolean) => matching === true)
    }
  })

  const target = entry ? entry[1] : defaultMethod

  if (!entry && target === null) {
    throw new Error('No method specified for provided arguments')
  }

  return target
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
  const fn: Dispatch = (...args) => {
    const currentDispatchValue = dispatch(...args)

    const target = findTarget(
      methodEntries,
      currentDispatchValue,
      args,
      defaultMethod,
    )

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
  type Recur = (
    counter: number,
    previousSegmentsArgs?: any[],
  ) => Recur | Dispatch

  const recur: Recur = (counter, previousSegmentsArgs = []) => {
    if (counter === 1) {
      return (...args: any[]) => {
        const segmentsArgs = [...previousSegmentsArgs, args]
        const count = segmentsArgs.length

        let currentDispatchValue = dispatch(...segmentsArgs[0])

        for (let i = 1; i < count; i++) {
          currentDispatchValue = currentDispatchValue(...segmentsArgs[i])
        }

        const target = findTarget(
          methodEntries,
          currentDispatchValue,
          [].concat(...segmentsArgs),
          defaultMethod,
        )

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

    const fn: Dispatch = (...args) => {
      return recur(counter - 1, [...previousSegmentsArgs, args])
    }

    Object.defineProperty(fn, 'length', { value: dispatch.length })

    return fn
  }

  return recur(segmentsCount)
}

const validateOtherArgs = (args: any[]) => {
  args.forEach((item) => {
    if (typeof item !== 'function' || item[methodKey] !== true) {
      throw new Error(
        'Second or further argument of multi must be a partially applied method',
      )
    }
  })
}

const getFirstArgumentType = (arg) => {
  if (typeof arg !== 'function') {
    throw new Error(
      'First argument of multi must be either dispatch function, multimethod, or partially applied method',
    )
  }

  return arg[methodKey]
    ? 'method'
    : arg[multimethodKey]
    ? 'multimethod'
    : 'dispatch'
}

const createNewMultimethod = (dispatch, methodEntries, defaultMethod) => {
  const segmentsCount = countSegments(dispatch)

  const multimethod =
    segmentsCount === 1
      ? createSimpleTarget(methodEntries, defaultMethod, dispatch)
      : createSegmentedTarget(
          methodEntries,
          defaultMethod,
          dispatch,
          segmentsCount,
        )

  multimethod[multimethodKey] = {
    defaultMethod,
    dispatch,
    methodEntries,
  }

  return multimethod
}

type CreateMultimethod = (
  methodEntries?: MethodEntries,
) => (defaultMethod?: DefaultMethod) => Multi

const createMultimethod: CreateMultimethod = (methodEntries = []) => (
  defaultMethod = null,
) => (...args) => {
  const [first, ...rest] = args

  if (first === undefined) {
    throw new Error('You have to provide at least one argument')
  }

  if (rest.length > 0) {
    validateOtherArgs(rest)
  }

  const firstArgumentType = getFirstArgumentType(first)

  const methods = (firstArgumentType !== 'method' ? rest : args) as Method[]

  const multimethod =
    firstArgumentType === 'multimethod'
      ? first
      : createNewMultimethod(
          (firstArgumentType === 'dispatch'
            ? first
            : implicitDispatch) as Dispatch,
          methodEntries,
          defaultMethod,
        )

  if (methods.length !== 0) {
    return compose(...methods)(multimethod)
  }

  return multimethod
}

export { createMultimethod, multimethodKey, methodKey }
