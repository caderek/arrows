import reduce from '@arrows/array/reduce'
import { ChainFunctions } from './internal/types'
import chain from './chain'
import wrapSync from './internal/wrapSync'

const railSync: ChainFunctions = chain(reduce, wrapSync)

export { railSync }
export default railSync
