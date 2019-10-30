import chainRight from './chain'
import { Pipe } from './internal/common-types'
import wrap from './internal/wrap'
import railAsync from './railAsync'

type Rail = Pipe & {
  async: Pipe
}

const rail: Rail = Object.assign(chainRight(wrap), {
  async: railAsync,
})

export { rail }
export default rail
