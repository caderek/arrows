import chain from './chain'
import { Pipe } from './internal/common-types'
import wrapAsync from './internal/wrapAsync'

const railAsync: Pipe = chain(wrapAsync)

export { railAsync }
export default railAsync
