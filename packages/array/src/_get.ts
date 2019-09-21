type Get = (index: number) => (arr: any[]) => any

const _get: Get = (index) => (arr) => arr[index]

export { _get }
export default _get
