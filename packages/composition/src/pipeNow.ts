import { ArityOneFn } from './internal/common-types'
import { PipeNow20 } from './pipeNow.types'

const pipeNow: PipeNow20 = (initialArg: any, ...fns: ArityOneFn[]) =>
  fns.reduce((arg: any, fn: ArityOneFn) => fn(arg), initialArg)

export { pipeNow }
export default pipeNow
