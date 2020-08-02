type GenerationLogic = "union" | "intersection";

// Hack to get gen type
const arrayConvert = <T>(...args: T[]): T[] => args;

const isKeyDefined = (object: any, key: string) => object[key] !== undefined;

export const typifyGen = <T extends object>(
  objects: T[],
  logic: GenerationLogic = "union"
) => {
  if (!objects) {
    throw Error("Undefined or null argument");
  }
  if (!Array.isArray(objects)) {
    throw Error("The provided arguments should be in an array");
  }
  if (!objects.length) {
    throw Error("At least one argument should be provided");
  }

  // We are going to do some operations on this array
  objects = JSON.parse(JSON.stringify(objects));

  if (logic === "intersection") {
    console.warn(
      "typify-gen : Be careful, you set the intersection generation logic, but your optional properties will still be displayed by TypeScript"
    );
    // Removing all keys that are not shared
    const keysToRemove: Set<string> = new Set();
    for (const obj of objects) {
      Object.keys(obj).forEach((key) => {
        for (const other of objects) {
          if (other === obj) {
            continue;
          }
          if (!other[key]) {
            keysToRemove.add(key);
            break;
          }
        }
      });
    }
    keysToRemove.forEach((key) => {
      for (const obj of objects) {
        delete obj[key];
      }
    });
  }

  // Generating type
  const genType = arrayConvert<typeof objects[0]>(objects[0]);
  type GenType = typeof genType[number];

  // Then collecting keys without duplicatas to define manipulation methods
  const keys: Set<string> = new Set();
  const optionalKeys: Set<string> = new Set();
  let isFirstIteration = true;
  objects.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      if (!isFirstIteration && !keys.has(key)) {
        optionalKeys.add(key);
      }
      keys.add(key);
    });
    if (isFirstIteration) {
      isFirstIteration = false;
    }
  });

  const isGenType = (val: object): val is GenType => {
    if (!val) return false;
    const matchingKeys = Object.keys(val).every((key) => keys.has(key));
    const sameLengthKeys =
      logic === "intersection"
        ? Object.keys(val).length === keys.size
        : Object.keys(val).length >= keys.size - optionalKeys.size;
    return matchingKeys && sameLengthKeys;
  };

  const isGenTypeInherited = (val: object): boolean => {
    if (!val) return false;
    const matchingKeys = [...keys].every((key) => isKeyDefined(val, key));
    const isInherited = Object.keys(val).length > keys.size;
    return matchingKeys && isInherited;
  };

  const genTypeCoercion = (val: object): GenType => {
    Object.keys(val)
      .filter((key) => !keys.has(key))
      .forEach((key) => delete val[key]);

    [...keys]
      .filter((key) => !isKeyDefined(val, key))
      .forEach((key) => (val[key] = undefined));

    return val as GenType;
  };

  return {
    genTypeCoercion,
    isGenType,
    isGenTypeInherited,
    genTypeKeys: [...keys],
    objects: objects as GenType[],
  };
};
