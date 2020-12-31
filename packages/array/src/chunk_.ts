import { curry } from "@arrows/composition/curry"

type _Chunk_ = <T>(chunkSize: number, arr: T[]) => T[][]
type _Chunk2_ = <T>(chunkSize: number) => (arr: T[]) => T[][]
type Chunk_ = _Chunk_ & _Chunk2_

const _chunk_: _Chunk_ = (chunkSize, arr) => {
  if (chunkSize <= 0) {
    throw new Error("Chunk size has to be greater than 0.")
  }

  const chunks = new Array(Math.ceil(arr.length / chunkSize))

  for (let i = 0, j = 0; i < arr.length; i = i + chunkSize, j++) {
    chunks[j] = arr.slice(i, i + chunkSize)
  }

  return chunks
}

/**
 * Splits the array into chunks of a provided size.
 *
 * @param chunkSize Chunk size
 * @param arr Initial array
 * @returns New array of chunks
 */
const chunk_: Chunk_ = curry(_chunk_)

export { chunk_ }
export default chunk_
