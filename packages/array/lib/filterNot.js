"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filterNot = (fn) => (arr) => arr.filter((element, index, array) => !fn(element, index, array));
exports.default = filterNot;
