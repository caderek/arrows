declare type Zip = (otherArr: any[]) => (arr: any[]) => any[][];
/**
 * Zips two arrays creating an array of pairs
 * containing values on corresponding indexes.
 * Zips until the length of the shorter array is reached.
 */
declare const zip: Zip;
export default zip;
