type Updater = (value: T) => T

type Update = (
  updater: Updater,
) => (index: number, valueIdNotExists?: T) => (arr: T[]) => T[]

const update_: Update = (updater) => (index, valueIdNotExists) => (arr) => {
  const newArr = [...arr]
  newArr[index] = updater(
    newArr[index] !== undefined ? newArr[index] : valueIdNotExists,
  )
  return newArr
}

export { update_ }
export default update_
