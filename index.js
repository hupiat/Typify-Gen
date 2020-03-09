"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function arrayConvert() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args;
}
function typifyGen() {
    var objects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objects[_i] = arguments[_i];
    }
    if (!objects.length) {
        throw Error("At least one argument should be provided");
    }
    var genType = arrayConvert(objects[0]);
    function isGenType(object) {
        if (!(objects[0] instanceof object) && !(object instanceof object)) {
            return typeof objects[0] === typeof object;
        }
        else if (!(objects[0] instanceof object) || !(object instanceof object)) {
            return false;
        }
        return Object.keys(object).every(function (key) { return !!objects[0][key]; });
    }
    return {
        objects: objects,
        isGenType: isGenType
    };
}
exports.typifyGen = typifyGen;
