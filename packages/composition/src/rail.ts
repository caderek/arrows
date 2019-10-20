import chain from './chain'
import { Pipe } from './internal/common-types'
import wrap from './internal/wrap'

const rail: Pipe = chain(wrap)

export { rail }
export default rail
