import { reduce, reduceRight } from '@arrows/array'
import { ChainFactory, ChainFunctions } from './types'

const wrapSync = (fn) => (input) => {
  if (input instanceof Error) {
    return input
  }

  let result

  try {
    result = fn(input)
  } catch (error) {
    result = error
  }

  return typeof result === 'undefined' ? input : result
}

const wrap = (fn) => (input) => {
  if (input instanceof Promise) {
    return input.then((rawInput) => {
      return wrapSync(fn)(rawInput)
    })
  }

  return wrapSync(fn)(input)
}

const chain: ChainFactory = (reducingFn, wrappingFn = null) => (...fns) => (
  initialArg,
) => {
  return wrappingFn
    ? reducingFn((arg: any, fn: Function) => wrappingFn(fn)(arg), initialArg)(
        fns,
      )
    : reducingFn((arg: any, fn: Function) => fn(arg), initialArg)(fns)
}

const compose: ChainFunctions = chain(reduceRight)
const pipe: ChainFunctions = chain(reduce)
const rail: ChainFunctions = chain(reduce, wrap)
const railSync: ChainFunctions = chain(reduce, wrapSync)

export { compose, pipe, rail, railSync }
