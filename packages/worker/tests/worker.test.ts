import { double } from "./workers/double.worker.js"
import { worker } from "../lib/index.js"

describe("worker", () => {
  it("spawns workers pool and returns task function - sync operations", async () => {
    const result = await double(7)
    expect(result).toBe(14)
  })

  it("throws when worker is not spawned in a separate file", () => {
    const test = () => worker((x) => x)

    expect(test).toThrowError("Worker must reside in a separate file.")
  })
})
