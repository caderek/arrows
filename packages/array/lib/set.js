"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const set = (index, value) => (arr) => {
    const newArr = [...arr];
    newArr[index] = value;
    return newArr;
};
exports.default = set;
