import chainRight from './chain'
import { Pipe } from './internal/common-types'
import wrapAsync from './internal/wrapAsync'

const railRightAsync: Pipe = chainRight(wrapAsync)

export { railRightAsync as railAsync }
export default railRightAsync
