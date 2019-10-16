import { createMultimethod } from './internal/multimethod'
import { MultiFn } from './internal/types'

/**
 * Creates multimethod - a function that can dynamically choose proper implementation,
 * based on arbitrary dispatch of its arguments
 */
const multi: MultiFn = createMultimethod()()

export { multi }
export default multi
