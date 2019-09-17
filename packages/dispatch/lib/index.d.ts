import getType from './getType';
import identity from './identity';
import types from './types';
export { getType, identity, types };
declare const _default: {
    getType: (val: any) => "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "array" | "null" | "regexp";
    identity: (x: any) => any;
    types: {
        array: string;
        object: string;
        function: string;
        string: string;
        number: string;
        bigint: string;
        symbol: string;
        regexp: string;
        null: string;
        undefined: string;
        boolean: string;
    };
};
export default _default;
