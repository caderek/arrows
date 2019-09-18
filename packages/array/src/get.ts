type Get = (index: number) => (arr: any[]) => any

const get: Get = (index) => (arr) => arr[index]

export default get
