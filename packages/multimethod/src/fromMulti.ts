import pipe from '@arrows/composition/pipe'
import { Method, Multi } from './internal/types'

const fromMulti = (...methods: Method[]) => (multimethod: Multi) => {
  return pipe(...methods)(multimethod)
}

export { fromMulti }
export default fromMulti
