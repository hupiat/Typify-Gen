"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Hack to get gen type
var arrayConvert = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args;
};
var areNotObjects = function (val, other) {
    return !(val instanceof Object) && !(other instanceof Object);
};
var oneIsNotObject = function (val, other) {
    return !(val instanceof Object) || !(other instanceof Object);
};
var isKeyDefined = function (object, key) { return object[key] !== undefined; };
exports.typifyGen = function (objects) {
    if (!objects.length) {
        throw Error("At least one argument should be provided");
    }
    var genType = arrayConvert(objects[0]);
    var isGenType = function (val) {
        if (areNotObjects(objects[0], val)) {
            return typeof objects[0] === typeof val;
        }
        else if (oneIsNotObject(objects[0], val)) {
            return false;
        }
        return (val && Object.keys(objects[0]).every(function (key) { return isKeyDefined(val, key); }));
    };
    var coercion = function (val) {
        if (areNotObjects(objects[0], val)) {
            return val;
        }
        else if (oneIsNotObject(objects[0], val)) {
            return val;
        }
        Object.keys(val)
            .filter(function (key) { return !isKeyDefined(objects[0], key); })
            .forEach(function (key) { return delete val[key]; });
        Object.keys(objects[0])
            .filter(function (key) { return !isKeyDefined(val, key); })
            .forEach(function (key) { return (val[key] = undefined); });
        return val;
    };
    return {
        coercion: coercion,
        isGenType: isGenType,
        objects: objects
    };
};
