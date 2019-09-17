"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reduceRight = (fn, initialValue) => (arr) => arr.reduceRight(fn, initialValue);
exports.default = reduceRight;
