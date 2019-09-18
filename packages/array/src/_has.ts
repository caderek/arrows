type Has = (index: number) => (arr: any[]) => boolean

const _has: Has = (index) => (arr) => index < arr.length

export default _has
