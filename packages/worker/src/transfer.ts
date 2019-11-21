import { Transfer, transferKey } from "./types"

const transfer: Transfer = (handler, mapperFn) => (payload, workerData) => {
  const result = handler(payload, workerData)
  const transferList = mapperFn(result)

  return {
    result,
    [transferKey]: transferList,
  }
}

export { transfer, transferKey }
export default transfer
