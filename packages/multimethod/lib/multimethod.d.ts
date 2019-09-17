declare const multi: (dispatch: any, ...methods: any[]) => any;
declare const method: (...args: any[]) => (multimethod: any) => any;
export { multi, method };
