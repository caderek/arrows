import { reduce } from '@arrows/array'
import { ChainFunctions } from './types'
import chain from './chain'
import wrap from './wrap'

const rail: ChainFunctions = chain(reduce, wrap)

export default rail
