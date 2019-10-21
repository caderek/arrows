import chainRight from './chain'
import { Pipe } from './internal/common-types'
import wrap from './internal/wrap'

const railRight: Pipe = chainRight(wrap)

export { railRight as rail }
export default railRight
