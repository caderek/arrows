declare type FilteringFn = (element: any, index: number, array: any[]) => boolean;
declare type FilterNot = (fn: FilteringFn) => (arr: any[]) => any[];
declare const filterNot: FilterNot;
export default filterNot;
