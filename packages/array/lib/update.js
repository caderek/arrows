"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update = (updater) => (index, valueIdNotExists) => (arr) => {
    const newArr = [...arr];
    newArr[index] = updater(newArr[index] !== undefined ? newArr[index] : valueIdNotExists);
    return newArr;
};
exports.default = update;
