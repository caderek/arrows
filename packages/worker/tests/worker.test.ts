import { double, doubleHandler } from "./workers/double.worker.js"
import { triple, tripleHandler } from "./workers/triple.worker.js"
import { identity, identityHandler } from "./workers/identity.worker.js"

describe("worker", () => {
  it("spawns workers pool and returns task function - default config", async () => {
    const result = await triple(5)
    const directResult = tripleHandler(5)

    expect(result).toBe(15)
    expect(directResult).toBe(15)

    triple.terminate()
  })

  it("spawns workers pool and returns task function - custom config", async () => {
    const result = await double(7)
    const directResult = doubleHandler(7)

    expect(result).toBe(14)
    expect(directResult).toBe(14)

    double.terminate()
  })

  it("if not in a main thread - defines worker thread, and returns nothing", () => {
    const directResult = identityHandler(7)

    expect(identity).toBe(undefined)
    expect(directResult).toBe(7)
  })
})
