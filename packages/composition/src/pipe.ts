import { reduce } from '@arrows/array'
import { ChainFunctions } from './types'
import chain from './chain'

const pipe: ChainFunctions = chain(reduce)

export default pipe
