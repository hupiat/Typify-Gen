"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var flowers = [
    {
        petals: 7,
        color: "red"
    },
    {
        petals: 4,
        color: "yellow"
    },
    {
        petals: 8,
        color: "blue"
    }
];
describe("TypifyGen", function () {
    it("should throw an error as there is no element to inspect", function () {
        expect(function () { return __1.typifyGen([]); }).toThrow(function () {
            return Error("At least one argument should be provided");
        });
    });
    var _a = __1.typifyGen(flowers), isGenType = _a.isGenType, objects = _a.objects, coercion = _a.coercion;
    it("should be the same type", function () {
        var flower = {
            petals: 1,
            color: "black"
        };
        expect(isGenType(flower)).toBeTrue();
        expect(isGenType(objects[0])).toBeTrue();
    });
    it("should be a different type", function () {
        var flower = {
            petals: 0
        };
        expect(isGenType(flower)).toBeFalse();
        expect(isGenType(undefined)).toBeFalse();
    });
    // it("should coerce the given objects with the exact same keys", () => {
    //   const flower = {
    //     petals: 9,
    //     color: "blue",
    //     brambles: 17
    //   };
    //   expect(coercion(flower).brambles)
    // });
});
