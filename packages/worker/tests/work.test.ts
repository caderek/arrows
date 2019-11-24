import { WorkerDefinition } from "./../src/types"
import { work, transfer } from "../lib"
import * as workerThreads from "worker_threads"

describe("work", () => {
  describe("when run in the main thread", () => {
    it("returns worker definition", () => {
      const handler = (x) => x
      const result = work(handler) as WorkerDefinition<
        number,
        undefined,
        number
      >
      expect(result.fileName).toBe(__filename)
      expect(result.handler).toBe(handler)
    })
  })

  describe("when run in a worker thread with the handler as a function", () => {
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

      work((x: number) => x * 5)

      // @ts-ignore
      workerThreads.parentPort = savedParentPort
      // @ts-ignore
      workerThreads.isMainThread = true
    })

    it("if the handler throws - sends the error along with the task id to the main thread", () => {
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
          const [id, _, error] = message
          expect(id).toBe("some_id")
          expect(error).toBeInstanceOf(Error)
          expect(error.message).toEqual("Oops!")
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

  describe("when run in a worker thread with the handler as an object", () => {
    it("sends the result along with the task id to the main thread", () => {
      // @ts-ignore
      workerThreads.isMainThread = false
      const savedParentPort = workerThreads.parentPort

      // @ts-ignore
      workerThreads.parentPort = {
        on(eventType, callback) {
          if (eventType === "message") {
            callback(["some_id", 3, "timesFive"])
          }
        },
        postMessage(message) {
          expect(message).toEqual(["some_id", 15])
        },
      }

      work({ timesFive: (x: number) => x * 5 })

      // @ts-ignore
      workerThreads.parentPort = savedParentPort
      // @ts-ignore
      workerThreads.isMainThread = true
    })

    it("if the method does not exist - sends the error along with the task id to the main thread", () => {
      // @ts-ignore
      workerThreads.isMainThread = false
      const savedParentPort = workerThreads.parentPort

      // @ts-ignore
      workerThreads.parentPort = {
        on(eventType, callback) {
          if (eventType === "message") {
            callback(["some_id", 3, "nonExistentMethod"])
          }
        },
        postMessage(message) {
          const [id, _, error] = message

          expect(id).toBe("some_id")
          expect(error).toBeInstanceOf(Error)
          expect(error.message).toBe(
            'The worker does not have "nonExistentMethod" method.',
          )
        },
      }

      work({ timesFive: (x: number) => x * 5 })

      // @ts-ignore
      workerThreads.parentPort = savedParentPort
      // @ts-ignore
      workerThreads.isMainThread = true
    })
  })
})
