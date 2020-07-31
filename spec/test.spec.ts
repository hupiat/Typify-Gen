import { typifyGen } from "..";

describe("typify-gen", () => {
  const flowers = [
    {
      petals: 7,
      color: "red",
    },
    {
      petals: 4,
      color: "yellow",
    },
    {
      petals: 8,
      color: "blue",
    },
  ];

  it("should throw an error as there is no element to inspect", () => {
    expect(() => typifyGen([])).toThrow(
      Error("At least one argument should be provided")
    );
  });

  const {
    objects,
    isGenType,
    isGenTypeInherited,
    genTypeCoercion,
    genTypeKeys,
  } = typifyGen(flowers);

  it("should match with keys", () => {
    expect(genTypeKeys).toEqual(["petals", "color"]);
  });

  it("should be the same type", () => {
    const flower = {
      petals: 2,
      color: "purple",
    };
    expect(isGenType(flower)).toBeTruthy();
    expect(isGenType(objects[0])).toBeTruthy();
  });

  it("should be a different type", () => {
    const flower = {
      petals: 0,
    };
    expect(isGenType(flower)).toBeFalsy();
    expect(isGenType({})).toBeFalsy();
  });

  it("should be an extended type", () => {
    const flower = {
      petals: 2,
      color: "purple",
      name: "orchid",
    };
    expect(isGenTypeInherited(flower)).toBeTruthy();
  });

  it("should not be an extended type", () => {
    const flower = {
      petals: 2,
      name: "orchid",
    };
    expect(isGenTypeInherited(flower)).toBeFalsy();
  });

  it("should coerce the given objects with the exact same keys", () => {
    const flower = {
      petals: 9,
      color: "blue",
      brambles: 17,
    };
    expect((genTypeCoercion(flower) as any).brambles).toBeUndefined();
    expect(genTypeCoercion({})).toEqual(
      jasmine.objectContaining({
        petals: undefined,
        color: undefined,
      })
    );
  });
});
