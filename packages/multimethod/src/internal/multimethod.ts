import compose from '@arrows/composition/compose'
import * as equal from 'fast-deep-equal'
import {
  FirstArgumentError,
  NoArgumentsError,
  NoMethodError,
  NotMethodError,
} from '../errors'
import {
  ConstructorCaseEntry,
  DefaultMethod,
  Dispatch,
  Method,
  MethodEntries,
  Multi,
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

type FindTarget = (
  methodEntries: MethodEntries,
  currentDispatchValue: any,
  args: any[],
  defaultMethod: DefaultMethod,
) => any

const findTarget: FindTarget = (
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
    throw new NoMethodError(`Args: ${args}`)
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

const areMethodsValid = (args: any[]) => {
  return args.every(
    (item) => typeof item === 'function' && item[methodKey] === true,
  )
}

type GetFirstArgumentType = (arg: any) => 'method' | 'dispatch'

const getFirstArgumentType: GetFirstArgumentType = (arg) => {
  if (typeof arg !== 'function') {
    throw new FirstArgumentError()
  }

  return arg[methodKey] ? 'method' : 'dispatch'
}

type CreateMultimethod = (
  methodEntries?: MethodEntries,
) => (defaultMethod?: DefaultMethod) => Multi

const createMultimethod: CreateMultimethod = (methodEntries = []) => (
  defaultMethod = null,
) => (...args) => {
  const [first, ...rest] = args

  if (first === undefined) {
    throw new NoArgumentsError()
  }

  if (rest.length > 0 && !areMethodsValid(rest)) {
    throw new NotMethodError(
      'Second or further argument of multi must be a partially applied method.',
    )
  }

  const firstArgumentType = getFirstArgumentType(first)

  const methods = (firstArgumentType !== 'method' ? rest : args) as Method[]
  const dispatch = (firstArgumentType === 'dispatch'
    ? first
    : implicitDispatch) as Dispatch

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

  // @ts-ignore
  multimethod[multimethodKey] = {
    defaultMethod,
    dispatch,
    methodEntries,
  }

  if (methods.length !== 0) {
    return compose(...methods)(multimethod)
  }

  return multimethod
}

export { createMultimethod, multimethodKey, methodKey, areMethodsValid }
