"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getType_1 = require("./getType");
exports.getType = getType_1.default;
const identity_1 = require("./identity");
exports.identity = identity_1.default;
const types_1 = require("./types");
exports.types = types_1.default;
exports.default = {
    getType: getType_1.default,
    identity: identity_1.default,
    types: types_1.default,
};
