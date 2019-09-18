type Updater = (value: any) => any

type Update = (
  updater: Updater,
) => (index: number, valueIdNotExists?: any) => (arr: any[]) => any[]

const _update: Update = (updater) => (index, valueIdNotExists) => (arr) => {
  const newArr = [...arr]
  newArr[index] = updater(
    newArr[index] !== undefined ? newArr[index] : valueIdNotExists,
  )
  return newArr
}

export default _update
