declare const getType: (val: any) => "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "array" | "null" | "regexp";
export default getType;
