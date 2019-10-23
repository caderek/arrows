type Rest = (arr: T[]) => T[]

const rest_: Rest = (arr) => arr.slice(1)

export { rest_ }
export default rest_
