declare type Callback = (currentValue?: any, index?: number, array?: any[]) => any[];
declare type FlatMap = (callback: Callback) => (arr: any[]) => any[];
/**
 * Functional wrapper for Array.prototype.flatMap
 */
declare const flatMap: FlatMap;
export default flatMap;
