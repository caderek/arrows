type Rest = (arr: any[]) => any[]

const _rest: Rest = (arr) => arr.slice(1)

export default _rest
