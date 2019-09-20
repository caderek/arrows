import * as equal from 'deep-strict-equal'
import { pipe } from '@arrows/composition'

const multimethodKey = Symbol('multimethod')

type Dispatch = (...args: any[]) => any
type MethodEntries = [any, any][]
type DefaultMethod = (arg0: any, arg1?: any) => any
type Internals = {
  methodEntries: MethodEntries
  defaultMethod: DefaultMethod
  dispatch: Dispatch
}
type Multimethod = {
  (...args: any[]): any
  [multimethodKey]: Internals
}
type Method = (
  arg0: any,
  arg1?: any,
) => (multimethod: Multimethod) => Multimethod

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

type CreateMultimethod = (
  methodEntries?: MethodEntries,
) => (
  defaultMethod?: DefaultMethod,
) => (dispatch: Dispatch, ...methods: Method[]) => Multimethod

const createMultimethod: CreateMultimethod = (methodEntries = []) => (
  defaultMethod = null,
) => (dispatch, ...methods) => {
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

type Multi = (dispatch: Dispatch, ...methods: Method[]) => Multimethod
const multi: Multi = createMultimethod()()

const method: Method = (...args) => (multimethod) => {
  if (!multimethod[multimethodKey]) {
    throw new Error('Function is not a multimethod')
  }

  const [first, second] = args
  const isNotDefault = second !== undefined
  const fn = isNotDefault ? second : first
  const dispatchValues = isNotDefault ? first : null

  const { methodEntries, defaultMethod, dispatch } = multimethod[multimethodKey]

  if (isNotDefault) {
    const newMethodEntries: MethodEntries = [
      [dispatchValues, fn],
      ...methodEntries,
    ]
    return createMultimethod(newMethodEntries)(defaultMethod)(dispatch)
  }

  return createMultimethod(methodEntries)(fn)(dispatch)
}

export { multi, method, multimethodKey }
