type Has = (index: number) => (arr: any[]) => boolean

const _has: Has = (index) => (arr) => index < arr.length

export { _has }
export default _has
