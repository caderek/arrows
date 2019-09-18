declare type FilteringFn = (element: any, index: number, array: any[]) => boolean;
declare type Filter = (fn: FilteringFn) => (arr: any[]) => any[];
declare const filter: Filter;
export default filter;
