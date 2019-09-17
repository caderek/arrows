"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const insert = (index, value) => (arr) => {
    return index >= arr.length
        ? arr.concat([value])
        : arr
            .slice(0, index)
            .concat([value])
            .concat(arr.slice(index));
};
exports.default = insert;
