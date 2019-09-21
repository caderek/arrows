import reduceRight from '@arrows/array/reduceRight'
import { ChainFunctions } from './types'
import chain from './chain'

const compose: ChainFunctions = chain(reduceRight)

export { compose }
export default compose
