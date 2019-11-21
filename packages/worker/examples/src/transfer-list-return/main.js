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
   *
   * Note that worker also uses transfer list via `transfer` function,
   * so the result is also moved rather than cloned.
   */
  const resultA = await myWorker(payload1, [payload1.buffer])

  console.log(resultA) // -> Uint8Array [ 2, 4, 6, 8 ]

  /**
   * The result memory is moved back, so we can use it again.
   */
  const resultB = await myWorker(resultA, [resultA.buffer])

  console.log(resultB) // -> Uint8Array [ 4, 8, 12, 16 ]

  /**
   * This won't work, because we are using `resultB` as a payload
   * twice, co the memory is unaccessible for the second call.
   */
  // const resultC = await Promise.all([
  //   myWorker(resultB, [resultB.buffer]),
  //   myWorker(resultB, [resultB.buffer]),
  // ])
}

main()
