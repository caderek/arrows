declare type Comparator = (a: any, b: any) => number;
declare type Sort = (fn?: Comparator) => (arr: any[]) => any[];
declare const sort: Sort;
export default sort;
