import { reduceRight } from '@arrows/array'
import { ChainFunctions } from './types'
import chain from './chain'

const compose: ChainFunctions = chain(reduceRight)

export default compose
