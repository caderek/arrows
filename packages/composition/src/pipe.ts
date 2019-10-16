import reduce from '@arrows/array/reduce'
import chain from './chain'
import { ChainFunctions } from './internal/common-types'

const pipe: ChainFunctions = chain(reduce)

export { pipe }
export default pipe
