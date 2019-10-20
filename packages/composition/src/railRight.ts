import chainRight from './chainRight'
import { Pipe } from './internal/common-types'
import wrap from './internal/wrap'

const railRight: Pipe = chainRight(wrap)

export { railRight }
export default railRight
