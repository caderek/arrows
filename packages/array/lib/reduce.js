"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reduce = (fn, initialValue) => (arr) => arr.reduce(fn, initialValue);
exports.default = reduce;
