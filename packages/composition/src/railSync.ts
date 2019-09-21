import { reduce } from '@arrows/array'
import { ChainFunctions } from './types'
import chain from './chain'
import wrapSync from './wrapSync'

const railSync: ChainFunctions = chain(reduce, wrapSync)

export default railSync
