declare type ZipAll = (otherArr: any[]) => (arr: any[]) => any[][];
/**
 * Zips two arrays creating an array of pairs
 * containing values on corresponding indexes.
 * Zips until the length of the longer array is reached.
 */
declare const zipAll: ZipAll;
export default zipAll;
