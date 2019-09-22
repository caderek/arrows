import { createMultimethod } from './internal/multimethod'
import { Multi } from './internal/types'

const multi: Multi = createMultimethod()()

export { multi }
export default multi
