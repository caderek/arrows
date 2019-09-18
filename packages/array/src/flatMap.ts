type Callback = (currentValue?: any, index?: number, array?: any[]) => any[]
type FlatMap = (callback: Callback) => (arr: any[]) => any[]

/**
 * Functional wrapper for Array.prototype.flatMap
 */
const flatMap: FlatMap = (callback) => (arr) => arr.flatMap(callback)

export default flatMap
