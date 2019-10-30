import chainRight from './chainRight'
import { Compose } from './internal/common-types'
import wrap from './internal/wrap'
import railRightAsync from './railRightAsync'

type RailRight = Compose & {
  async: Compose
}

const railRight: RailRight = Object.assign(chainRight(wrap), {
  async: railRightAsync,
})

export { railRight }
export default railRight
