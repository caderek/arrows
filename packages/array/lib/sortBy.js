"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultComparator = (a, b) => (a > b ? 1 : -1);
const sortBy = (valueMapper) => (comparator = defaultComparator) => (arr) => {
    return [...arr].sort((a, b) => comparator(valueMapper(a), valueMapper(b)));
};
exports.default = sortBy;
