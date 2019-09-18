type Rest = (arr: any[]) => any[]

const rest: Rest = (arr) => arr.slice(1)

export default rest
