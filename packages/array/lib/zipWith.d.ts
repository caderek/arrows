declare type ZippingFn = (a: any, b: any) => any;
declare type ZipWith = (fn: ZippingFn) => (otherArr: any[]) => (arr: any[]) => any[];
/**
 * Zips two arrays creating an array containing values
 * created by running provided function on values pairs at corresponding indexes.
 * Zips until the length of the shorter array is reached.
 */
declare const zipWith: ZipWith;
export default zipWith;
