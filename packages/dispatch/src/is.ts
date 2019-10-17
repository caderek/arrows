import curry from '@arrows/composition/curry'
import { Class } from './internal/common-types'

type RawIs = (prototype: Class, value: any) => boolean

const rawIs: RawIs = (prototype, value) => value instanceof prototype

type Is = RawIs & ((prototype: Class) => (value: any) => boolean)

/**
 * Checks if a value is an instance of a prototype/class.
 */
const is: Is = curry(rawIs)

export { is }
export default is
