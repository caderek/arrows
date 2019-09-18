declare type GroupingFn = (x: any) => any;
declare type GroupBy = (groupingFn: GroupingFn) => (arr: any[]) => Object;
declare const groupBy: GroupBy;
export default groupBy;
