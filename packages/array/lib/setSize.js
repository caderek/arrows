"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setSize = (size) => (arr) => {
    return size <= arr.length
        ? arr.slice(0, size)
        : arr.slice(0).concat(Array.from({ length: size - arr.length }));
};
exports.default = setSize;
