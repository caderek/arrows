import chainRight from './chainRight'
import { Compose } from './internal/common-types'
import wrapAsync from './internal/wrapAsync'

const railRightAsync: Compose = chainRight(wrapAsync)

export { railRightAsync as railAsync }
export default railRightAsync
