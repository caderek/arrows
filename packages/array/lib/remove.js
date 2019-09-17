"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const remove = (index) => (arr) => arr.slice(0, index).concat(arr.slice(index + 1));
exports.default = remove;
