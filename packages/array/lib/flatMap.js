"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Functional wrapper for Array.prototype.flatMap
 */
const flatMap = (callback) => (arr) => arr.flatMap(callback);
exports.default = flatMap;
