import { transfer } from "../lib"
import { transferKey } from "../lib/types"

describe("transfer", () => {
  it("Wraps a handler function and adds a transferList to the result - one-argument handler", () => {
    const handler = (payload: Uint8Array) => {
      return { payload }
    }

    const wrappedHandler = transfer(handler, (result) => [
      result.payload.buffer,
    ])

    const resultWithTransferList = wrappedHandler(new Uint8Array([1, 2]))

    expect(resultWithTransferList.result).toEqual({
      payload: new Uint8Array([1, 2]),
    })

    expect(resultWithTransferList[transferKey][0]).toBeInstanceOf(ArrayBuffer)
  })

  it("Wraps a handler function and adds a transferList to the result - two-argument handler", () => {
    const handler = (payload: Uint8Array, workerData: Uint8Array) => {
      return { payload, workerData }
    }

    const wrappedHandler = transfer(handler, (result) => [
      result.payload.buffer,
      result.workerData.buffer,
    ])

    const resultWithTransferList = wrappedHandler(
      new Uint8Array([1, 2]),
      new Uint8Array([3, 4]),
    )

    expect(resultWithTransferList.result).toEqual({
      payload: new Uint8Array([1, 2]),
      workerData: new Uint8Array([3, 4]),
    })

    expect(resultWithTransferList[transferKey][0]).toBeInstanceOf(ArrayBuffer)
    expect(resultWithTransferList[transferKey][1]).toBeInstanceOf(ArrayBuffer)
  })
})
