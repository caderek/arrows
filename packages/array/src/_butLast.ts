type ButLast = (arr: any[]) => any[]

const _butLast: ButLast = (arr) => arr.slice(0, -1)

export { _butLast }
export default _butLast
