declare type ValueMapper = (element: any) => any;
declare type Comparator = (a: any, b: any) => number;
declare type SortBy = (valueMapper: ValueMapper) => (comparator?: Comparator) => (arr: any[]) => any[];
declare const sortBy: SortBy;
export default sortBy;
