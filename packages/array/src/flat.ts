type Flat = (depth?: number) => (arr: any[]) => any[]

/**
 * Functional wrapper for Array.prototype.flat
 */
const flat: Flat = (depth = 1) => (arr) => arr.flat(depth)

export default flat
