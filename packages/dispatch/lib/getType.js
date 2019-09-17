"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getType = (val) => {
    if (Array.isArray(val)) {
        return 'array';
    }
    if (val === null) {
        return 'null';
    }
    if (val instanceof RegExp) {
        return 'regexp';
    }
    return typeof val;
};
exports.default = getType;
