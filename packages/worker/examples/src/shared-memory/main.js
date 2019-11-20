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
  /**
   * Let's create a TypedArray of integers,
   * using a SharedArrayBuffer of according size.
   */
  const buffer = new SharedArrayBuffer(10)
  const sharedData = new Uint8Array(buffer)

  /**
   * Let's fill the array with numbers from 0 to 9
   */
  sharedData.forEach((_, i) => {
    Atomics.store(sharedData, i, i)
  })

  console.log(sharedData)
  // -> Uint8Array [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  /**
   * Now we will send our shared data along with the information on which
   * part of the array worker should operate.
   *
   * Note that `myWorker` function has a worker pool underneath,
   * so as long as the pool has a size of two or more,
   * the tasks will be performed in parallel!
   */
  await myWorker({ sharedData, from: 0, to: 5 })
  await myWorker({ sharedData, from: 5, to: 10 })

  console.log(sharedData)
  // -> Uint8Array [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
}

main()
