import { multi, method } from './multimethod';
export { multi, method };
declare const _default: {
    multi: (dispatch: any, ...methods: any[]) => any;
    method: (...args: any[]) => (multimethod: any) => any;
};
export default _default;
