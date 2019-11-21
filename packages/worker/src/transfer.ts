import { Transfer, transferKey } from "./types"

/**
 * Wraps a worker handler so you can add a transfer list for the result.
 *
 * Works only if the result is an instance of a Buffer or a TypedArray.
 *
 * @param handler - Handler function
 * @param mapperFn - Takes the result and should produce a transfer list.
 * @returns A wrapped handler whose result will be moved rather than cloned.
 */
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
