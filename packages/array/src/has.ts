type Has = (index: number) => (arr: any[]) => boolean

const has: Has = (index) => (arr) => index < arr.length

export default has
