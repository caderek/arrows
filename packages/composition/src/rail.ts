import reduce from '@arrows/array/reduce'
import { ChainFunctions } from './internal/types'
import chain from './chain'
import wrap from './internal/wrap'

const rail: ChainFunctions = chain(reduce, wrap)

export { rail }
export default rail
