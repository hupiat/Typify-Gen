import { typifyGen } from "..";

const flowers = [
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

describe("TypifyGen", () => {
	it("should throw an error as there is no element to inspect", () => {
		expect(() => typifyGen([])).toThrow(
			Error("At least one argument should be provided")
		);
	});

	const { isGenType, objects, coercion } = typifyGen(flowers);

	it("should be the same type", () => {
		const flower = {
			petals: 1,
			color: "black"
		};
		expect(isGenType(flower)).toBeTrue();
		expect(isGenType(objects[0])).toBeTrue();
	});

	it("should be a different type", () => {
		const flower = {
			petals: 0
		};
		expect(isGenType(flower)).toBeFalse();
		expect(isGenType(undefined)).toBeFalse();
	});

	it("should coerce the given objects with the exact same keys", () => {
		const flower = {
			petals: 9,
			color: "blue",
			brambles: 17
		};
		expect((coercion(flower) as any).brambles).toBeUndefined();
		expect(coercion({})).toEqual(
			jasmine.objectContaining({
				petals: undefined,
				color: undefined
			})
		);
	});
});
