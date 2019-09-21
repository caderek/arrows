type Concat = (value: any) => (arr: any[]) => any[]

const concat: Concat = (value) => (arr) => arr.concat(value)

export { concat }
export default concat
