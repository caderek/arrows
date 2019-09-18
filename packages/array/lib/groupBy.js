"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const groupBy = (groupingFn) => (arr) => {
    const groups = {};
    arr.forEach((item) => {
        const key = groupingFn(item);
        if (groups[key] !== undefined) {
            groups[key].push(item);
        }
        else {
            groups[key] = [item];
        }
    });
    return groups;
};
exports.default = groupBy;
