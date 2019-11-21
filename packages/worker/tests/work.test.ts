import { work, transfer } from "../lib"
import * as workerThreads from "worker_threads"

describe("work", () => {
  it("does nothing if run in the main thread", () => {
    const result = work((x) => x)
    expect(result).toBe(undefined)
  })

  describe("when tun in a worker thread", () => {
    it("sends the result along with the task id to the main thread", () => {
      // @ts-ignore
      workerThreads.isMainThread = false
      const savedParentPort = workerThreads.parentPort

      // @ts-ignore
      workerThreads.parentPort = {
        on(eventType, callback) {
          if (eventType === "message") {
            callback(["some_id", 3])
          }
        },
        postMessage(message) {
          expect(message).toEqual(["some_id", 15])
        },
      }

      work((x) => x * 5)

      // @ts-ignore
      workerThreads.parentPort = savedParentPort
      // @ts-ignore
      workerThreads.isMainThread = true
    })

    it("sends the error along with the task id to the main thread", () => {
      // @ts-ignore
      workerThreads.isMainThread = false
      const savedParentPort = workerThreads.parentPort

      const errorStub = new Error("Oops!")

      // @ts-ignore
      workerThreads.parentPort = {
        on(eventType, callback) {
          if (eventType === "message") {
            callback(["some_id", "foo"])
          }
        },
        postMessage(message) {
          expect(message).toEqual(["some_id", "foo", errorStub])
        },
      }

      work((x) => {
        if (typeof x !== "number") {
          throw errorStub
        }
      })

      // @ts-ignore
      workerThreads.parentPort = savedParentPort
      // @ts-ignore
      workerThreads.isMainThread = true
    })

    it("sends the result along with the task id and transferList to the main thread", () => {
      // @ts-ignore
      workerThreads.isMainThread = false
      const savedParentPort = workerThreads.parentPort

      // @ts-ignore
      workerThreads.parentPort = {
        on(eventType, callback) {
          if (eventType === "message") {
            callback(["some_id", new Uint8Array([1, 2, 3])])
          }
        },
        postMessage(message, transferList) {
          expect(message).toEqual(["some_id", new Uint8Array([1, 2, 3])])
          expect(transferList.length).toBe(1)
          expect(transferList[0]).toBeInstanceOf(ArrayBuffer)
          expect(transferList[0].byteLength).toBe(3)
        },
      }

      const wrappedHandler = transfer(
        (payload: Uint8Array) => payload,
        (result: Uint8Array) => [result.buffer],
      )

      work(wrappedHandler)

      // @ts-ignore
      workerThreads.parentPort = savedParentPort
      // @ts-ignore
      workerThreads.isMainThread = true
    })
  })
})
