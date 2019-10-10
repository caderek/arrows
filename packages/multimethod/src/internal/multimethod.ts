import pipe from '@arrows/composition/pipe'
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

    const entry = methodEntries.find(([dispatchEntry]) => {
      // @todo optimize this by preselecting if this check if needed,
      // when multimethod is created
      // @todo use dep strict equal only when needed
      switch (dispatchEntry.type) {
        case 'value':
          return equal(dispatchEntry.value, currentDispatchValue)
        case 'function':
          return dispatchEntry.value(...args)
        case 'constructor':
          return currentDispatchValue instanceof dispatchEntry.value
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

        const entry = methodEntries.find(([dispatchEntry]) => {
          switch (dispatchEntry.type) {
            case 'value':
              return equal(dispatchEntry.value, currentDispatchValue)
            case 'function':
              return dispatchEntry.value(...[].concat(...segmentsArgs))
            case 'constructor':
              return currentDispatchValue instanceof dispatchEntry.value
            case 'mixed':
              return dispatchEntry.values
                .map(
                  (
                    item: ConstructorCaseEntry | ValueCaseEntry,
                    index: number,
                  ) =>
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

const validateFirstArg = (arg: any) => {
  if (typeof arg !== 'function' && arg !== undefined) {
    throw new Error(
      'First argument of multi must be either dispatch function or partially applied method',
    )
  }
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

type IsDispatchProvided = (item: any) => boolean

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
  const dispatch = (haveDispatchFn ? first : implicitDispatch) as Dispatch
  // Reverse, so methods have natural order (because by default, `method`
  // adds to the front of the methods list)
  const methods = (haveDispatchFn ? rest : args).reverse() as Method[]

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

  // @ts-ignore
  resultFn[multimethodKey] = {
    defaultMethod,
    dispatch,
    methodEntries,
  }

  if (methods.length !== 0) {
    return pipe(...methods)(resultFn)
  }

  return resultFn
}

export { createMultimethod, multimethodKey, methodKey }
