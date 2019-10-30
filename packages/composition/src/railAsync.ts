import chainRight from './chain'
import { Pipe } from './internal/common-types'
import wrapAsync from './internal/wrapAsync'

const railAsync: Pipe = chainRight(wrapAsync)

export { railAsync }
export default railAsync
