"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Zips two arrays creating an array containing values
 * created by running provided function on values pairs at corresponding indexes.
 * Zips until the length of the shorter array is reached.
 */
const zipWith = (fn) => (otherArr) => (arr) => {
    const length = Math.min(arr.length, otherArr.length);
    const newArr = [];
    for (let i = 0; i < length; i++) {
        const value = fn(arr[i], otherArr[i]);
        newArr.push(value);
    }
    return newArr;
};
exports.default = zipWith;
