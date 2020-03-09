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
    var dynType = arrayConvert(objects[0]);
    return objects.map(function (o) { return o; });
}
exports.typifyGen = typifyGen;
