declare type Flat = (depth?: number) => (arr: any[]) => any[];
/**
 * Functional wrapper for Array.prototype.flat
 */
declare const flat: Flat;
export default flat;
