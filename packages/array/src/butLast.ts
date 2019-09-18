type ButLast = (arr: any[]) => any[]

const butLast: ButLast = (arr) => arr.slice(0, -1)

export default butLast
