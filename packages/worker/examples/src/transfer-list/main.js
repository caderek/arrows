const myWorker = require("./myWorker")

/**
 * Transfer list usage example.
 *
 * If the payload contains an ArrayBuffer instances,
 * created either directly or used by TypedArray instance,
 * you can use the second argument of the task function
 * (function returned by `worker` or `spawn` function) to list those buffers,
 * so their memory is moved instead of cloned.
 *
 * It is much faster than default behavior (serializing and deserializing),
 * but makes a buffer (and TypedArray that uses it) unusable in the main thread.
 */
const main = async () => {
  const payload1 = new Uint8Array([1, 2, 3, 4])

  /**
   * We use the second argument to pass a transfer list,
   * in this case, the payload's buffer is moved to the worker.
   * From now on, only the worker's handler can use it.
   */
  const resultA = await myWorker(payload1, [payload1.buffer])

  /**
   * This won't work, because payload1's buffer is already moved.
   */
  // const resultB = await myWorker(payload1, [payload1.buffer])

  /**
   * This won't work either, for the same reason.
   */
  // const resultC = payload.map((x) => x + 3)

  const payload2 = new Uint8Array([1, 2, 3, 4])

  /**
   * This will work because we've created a new ArrayBuffer.
   */
  const resultD = await myWorker(payload2, [payload2.buffer])

  const payload3 = new Uint8Array([1, 2, 3, 4])

  /**
   * This will also work, because we're not using transfer list
   * and memory is cloned rather than moved
   * - so we can use the payload many times.
   */
  const resultE = await myWorker(payload3)
  const resultF = await myWorker(payload3)

  console.log({ resultA, resultD, resultE, resultF })
  // -> { resultA: 10, resultD: 10, resultE: 10, resultF: 10 }
}

main()
