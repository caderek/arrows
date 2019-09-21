import reduce from '@arrows/array/reduce'
import { ChainFunctions } from './types'
import chain from './chain'

const pipe: ChainFunctions = chain(reduce)

export { pipe }
export default pipe
