"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const equal = require("deep-strict-equal");
const composition_1 = require("@arrows/composition");
const multimethodKey = Symbol ? Symbol('multimethod') : 'multimethod';
const countSegments = (dispatch) => {
    let count = 1;
    let current = dispatch;
    try {
        while (typeof current === 'function') {
            const next = current();
            if (typeof next === 'function') {
                count++;
                current = next;
            }
            else {
                return count;
            }
        }
    }
    catch (_a) { }
    return count;
};
const createSimpleTarget = (methodEntries, defaultMethod, dispatch) => {
    return (...args) => {
        let currentDispatchValue = dispatch(...args);
        const entry = methodEntries.find(([dispatchValue]) => equal(dispatchValue, currentDispatchValue));
        const target = entry ? entry[1] : defaultMethod;
        if (!entry && target === null) {
            throw new Error('No method specified for provided arguments');
        }
        if (typeof target !== 'function') {
            return target;
        }
        return target(...args);
    };
};
const createSegmentedTarget = (methodEntries, defaultMethod, dispatch, segmentsCount) => {
    const recur = (counter, previousSegmentsArgs = []) => {
        if (counter === 1) {
            return (...args) => {
                const segmentsArgs = [...previousSegmentsArgs, args];
                let count = segmentsArgs.length;
                let currentDispatchValue = dispatch;
                for (let i = 0; i < count; i++) {
                    currentDispatchValue = currentDispatchValue(...segmentsArgs[i]);
                }
                const entry = methodEntries.find(([dispatchValue]) => equal(dispatchValue, currentDispatchValue));
                const target = entry ? entry[1] : defaultMethod;
                if (!entry && target === null) {
                    throw new Error('No method specified for provided arguments');
                }
                if (typeof target !== 'function') {
                    return target;
                }
                let result = target;
                for (let i = 0; i < count; i++) {
                    result = result(...segmentsArgs[i]);
                }
                return result;
            };
        }
        return (...args) => {
            return recur(counter - 1, [...previousSegmentsArgs, args]);
        };
    };
    return recur(segmentsCount);
};
const createMultimethod = (methodEntries = []) => (defaultMethod = null) => (dispatch, ...methods) => {
    const segmentsCount = countSegments(dispatch);
    const resultFn = segmentsCount === 1
        ? createSimpleTarget(methodEntries, defaultMethod, dispatch)
        : createSegmentedTarget(methodEntries, defaultMethod, dispatch, segmentsCount);
    resultFn[multimethodKey] = {
        methodEntries,
        defaultMethod,
        dispatch,
    };
    if (methods.length !== 0) {
        return composition_1.pipe(...methods)(resultFn);
    }
    return resultFn;
};
const multi = createMultimethod()();
exports.multi = multi;
const method = (...args) => (multimethod) => {
    if (!multimethod[multimethodKey]) {
        throw new Error('Function is not a multimethod');
    }
    const [first, second] = args;
    const isNotDefault = second !== undefined;
    const fn = isNotDefault ? second : first;
    const dispatchValues = isNotDefault ? first : null;
    const { methodEntries, defaultMethod, dispatch } = multimethod[multimethodKey];
    if (isNotDefault) {
        const newMethodEntries = [[dispatchValues, fn], ...methodEntries];
        return createMultimethod(newMethodEntries)(defaultMethod)(dispatch);
    }
    return createMultimethod(methodEntries)(fn)(dispatch);
};
exports.method = method;
