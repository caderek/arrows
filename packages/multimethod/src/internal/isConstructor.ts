type IsConstructor = (value: any) => boolean

const isConstructor: IsConstructor = (value) => {
  return (
    typeof value === 'function' &&
    value.name &&
    value.name[0] === value.name[0].toUpperCase()
  )
}

export default isConstructor
