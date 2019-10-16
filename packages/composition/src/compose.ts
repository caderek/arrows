import reduceRight from '@arrows/array/reduceRight'
import chain from './chain'
import { ChainFunctions } from './internal/common-types'

const compose: ChainFunctions = chain(reduceRight)

export { compose }
export default compose
