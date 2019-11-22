import { Transfer, transferKey, WrappedHandlerObj } from "./types"

/**
 * Wraps a worker handler so you can add a transfer list for the result.
 *
 * Works only if the result is an instance of a Buffer or a TypedArray.
 *
 * @param handler - Handler function
 * @param mapperFn - Takes the result and should produce a transfer list.
 * @returns A wrapped handler whose result will be moved rather than cloned.
 */
const transfer: Transfer = (handler, mapperFn) => {
  if (typeof handler === "function") {
    return (payload, workerData) => {
      const result = handler(payload, workerData)
      const transferList = mapperFn(result)

      return {
        result,
        [transferKey]: transferList,
      }
    }
  }

  const wrapped: WrappedHandlerObj<any, any, any> = {}

  for (const key in handler) {
    wrapped[key] = (payload: any, workerData: any) => {
      const result = handler[key](payload, workerData)
      const transferList = mapperFn(result)

      return {
        result,
        [transferKey]: transferList,
      }
    }
  }

  return wrapped
}

export { transfer, transferKey }
export default transfer
