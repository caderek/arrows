export declare type ChainFunctions = (...fns: Function[]) => (initialArg: any) => any;
export declare type ChainFactory = (reduceFn: Function, wrappingFn?: Function) => ChainFunctions;
