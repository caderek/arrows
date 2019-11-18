import { workerData } from "worker_threads"
import { parentPort } from "worker_threads"
import { work } from "../lib"
import * as workerThreads from "worker_threads"

describe("work", () => {
  it("throws if run in the main thread", () => {
    const test = () => work((x) => x)
    expect(test).toThrowError("This code should not run in the main thread.")
  })

  it("when run in worker thread", () => {
    const parentPortSave = workerThreads.parentPort

    const spy = jest.fn()

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
    workerThreads.parentPort = parentPortSave
  })

  it("when run in worker thread", () => {
    const parentPortSave = workerThreads.parentPort

    const spy = jest.fn()
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
    workerThreads.parentPort = parentPortSave
  })
})
