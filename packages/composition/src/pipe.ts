import { ArityOneFn } from './internal/common-types'
import { Pipe20 } from './pipe.types'
import { PipeNow20 } from './pipeNow.types'
import pipeNow from './pipeNow'

type Pipe = Pipe20 & {
  now: PipeNow20
}

const curriedPipe: Pipe20 = (...fns: ArityOneFn[]) => (initialArg: any) =>
  fns.reduce((arg: any, fn: ArityOneFn) => fn(arg), initialArg)

const pipe: Pipe = Object.assign(curriedPipe, {
  now: pipeNow,
})

export { pipe }
export default pipe
