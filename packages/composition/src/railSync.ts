import reduce from '@arrows/array/reduce'
import { ChainFunctions } from './types'
import chain from './chain'
import wrapSync from './wrapSync'

const railSync: ChainFunctions = chain(reduce, wrapSync)

export { railSync }
export default railSync
