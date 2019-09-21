type Rest = (arr: any[]) => any[]

const _rest: Rest = (arr) => arr.slice(1)

export { _rest }
export default _rest
