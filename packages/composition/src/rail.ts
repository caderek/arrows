import reduce from '@arrows/array/reduce'
import { ChainFunctions } from './types'
import chain from './chain'
import wrap from './wrap'

const rail: ChainFunctions = chain(reduce, wrap)

export { rail }
export default rail
