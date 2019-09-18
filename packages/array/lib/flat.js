"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Functional wrapper for Array.prototype.flat
 */
const flat = (depth = 1) => (arr) => arr.flat(depth);
exports.default = flat;
