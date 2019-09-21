type Last = (arr: any[]) => any

const _last: Last = (arr) => arr[arr.length - 1]

export { _last }
export default _last
