import reduce from '@arrows/array/reduce'
import chain from './chain'
import { ChainFunctions } from './internal/common-types'
import wrap from './internal/wrap'

const rail: ChainFunctions = chain(reduce, wrap)

export { rail }
export default rail
