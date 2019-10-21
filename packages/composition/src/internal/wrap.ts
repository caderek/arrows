import { ArityOneFn } from './common-types'

const wrap = (fn: ArityOneFn, input: any) => {
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

export { wrap }
export default wrap
