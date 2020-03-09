"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Hack to get gen type
var arrayConvert = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args;
};
var isKeyDefined = function (object, key) { return object[key] !== undefined; };
exports.typifyGen = function (objects) {
    if (!objects.length) {
        throw Error("At least one argument should be provided");
    }
    var genType = arrayConvert(objects[0]);
    // We collect all the keys, optionals or not
    var keys = new Set();
    objects.forEach(function (obj) { return Object.keys(obj).forEach(function (key) { return keys.add(key); }); });
    var isGenType = function (val) {
        return !!val && __spread(keys).every(function (key) { return isKeyDefined(val, key); });
    };
    var coercion = function (val) {
        Object.keys(val)
            .filter(function (key) { return !keys.has(key); })
            .forEach(function (key) { return delete val[key]; });
        __spread(keys).filter(function (key) { return !isKeyDefined(val, key); })
            .forEach(function (key) { return (val[key] = undefined); });
        return val;
    };
    return {
        coercion: coercion,
        isGenType: isGenType,
        objects: objects
    };
};
