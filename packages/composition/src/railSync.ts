import reduce from '@arrows/array/reduce'
import chain from './chain'
import { ChainFunctions } from './internal/common-types'
import wrapSync from './internal/wrapSync'

const railSync: ChainFunctions = chain(reduce, wrapSync)

export { railSync }
export default railSync
