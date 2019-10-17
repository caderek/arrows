import curry from '@arrows/composition/curry'
import { arrayExpression } from '@babel/types'

type RawIsIn = (list: any[] | Set<any>, value: any) => boolean

const rawIsIn: RawIsIn = (list, value) => {
  return Array.isArray(list) ? list.includes(value) : list.has(value)
}

type IsIn = RawIsIn & ((list: any[] | Set<any>) => (value: any) => boolean)

/**
 * Checks if a value is inside an array/set.
 */
const isIn: IsIn = curry(rawIsIn)

export { isIn }
export default isIn
