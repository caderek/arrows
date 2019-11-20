const myWorker = require("./myWorker")

/**
 * Shared memory example.
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
  await Promise.all([
    myWorker({ sharedData, from: 0, to: 5 }),
    myWorker({ sharedData, from: 5, to: 10 }),
  ])

  console.log(sharedData)
  // -> Uint8Array [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
}

main()
