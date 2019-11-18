import { spawn } from "../lib"

describe("spawn", () => {
  it("spawns workers pool and returns task function - default config", async () => {
    const fileName = `./tests/workers/tripleDefinition.worker.js`
    const triple = spawn(fileName)

    const result = await triple(7)

    expect(result).toBe(21)

    triple.unref()
  })

  it("spawns workers pool and returns task function - pool >= 1", async () => {
    const fileName = `./tests/workers/tripleDefinition.worker.js`
    const triple = spawn(fileName, { poolSize: 2 })

    const result = await triple(7)

    expect(result).toBe(21)

    triple.unref()
  })

  it("throws when pool size <= 0", async () => {
    const fileName = `./tests/workers/tripleDefinition.worker.js`

    const test = () => spawn(fileName, { poolSize: -1 })

    expect(test).toThrowError("Pool size has to be > 0")
  })

  it("returned promise rejects when worker throws an error - pool >= 1", async () => {
    const fileName = `./tests/workers/tripleDefinition.worker.js`

    const triple = spawn(fileName, { poolSize: 1 })

    try {
      await triple("foo")
    } catch (error) {
      expect(error.message).toEqual("Number required.")
    }

    triple.unref()
    triple.ref()
    triple.terminate()
  })
})
