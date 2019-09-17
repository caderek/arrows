"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = require("@arrows/array");
const wrapSync = (fn) => (input) => {
    if (input instanceof Error) {
        return input;
    }
    let result;
    try {
        result = fn(input);
    }
    catch (error) {
        result = error;
    }
    return typeof result === 'undefined' ? input : result;
};
const wrap = (fn) => (input) => {
    if (input instanceof Promise) {
        return input.then((rawInput) => {
            return wrapSync(fn)(rawInput);
        });
    }
    return wrapSync(fn)(input);
};
const chain = (reducingFn, wrappingFn = null) => (...fns) => (initialArg) => {
    return wrappingFn
        ? reducingFn((arg, fn) => wrappingFn(fn)(arg), initialArg)(fns)
        : reducingFn((arg, fn) => fn(arg), initialArg)(fns);
};
const compose = chain(array_1.reduceRight);
exports.compose = compose;
const pipe = chain(array_1.reduce);
exports.pipe = pipe;
const rail = chain(array_1.reduce, wrap);
exports.rail = rail;
const railSync = chain(array_1.reduce, wrapSync);
exports.railSync = railSync;
