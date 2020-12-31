import { curry } from "@arrows/composition/curry"

type _Aperture_ = <T>(chunkSize: number, arr: T[]) => T[][]
type _Aperture2_ = <T>(chunkSize: number) => (arr: T[]) => T[][]
type Aperture_ = _Aperture_ & _Aperture2_

const _aperture_: _Aperture_ = (chunkSize, arr) => {
  if (chunkSize <= 0) {
    throw new Error("Chunk size has to be greater than 0.")
  }

  const len = arr.length - chunkSize
  const chunks = new Array(len < 0 ? 0 : len)

  for (let i = 0; i <= arr.length - chunkSize; i++) {
    chunks[i] = arr.slice(i, i + chunkSize)
  }

  return chunks
}

/**
 * Splits the array into overlapping chunks of a provided size (shifted by one).
 *
 * @param chunkSize Chunk size
 * @param arr Initial array
 * @returns New array of chunks
 */
const aperture_: Aperture_ = curry(_aperture_)

export { aperture_ }
export default aperture_
