declare type Updater = (value: any) => any;
declare type Update = (updater: Updater) => (index: number, valueIdNotExists?: any) => (arr: any[]) => any[];
declare const update: Update;
export default update;
