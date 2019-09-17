"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const composition_1 = require("./composition");
exports.compose = composition_1.compose;
exports.pipe = composition_1.pipe;
exports.rail = composition_1.rail;
exports.railSync = composition_1.railSync;
exports.default = {
    compose: composition_1.compose,
    pipe: composition_1.pipe,
    rail: composition_1.rail,
    railSync: composition_1.railSync,
};
