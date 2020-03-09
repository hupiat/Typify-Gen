// Hack to get gen type
const arrayConvert = <T>(...args: T[]): T[] => args;

const areNotObjects = (val: any, other: any) =>
	!(val instanceof Object) && !(other instanceof Object);

const oneIsNotObject = (val: any, other: any) =>
	!(val instanceof Object) || !(other instanceof Object);

const isKeyDefined = (object: any, key: string) => object[key] !== undefined;

export const typifyGen = <T>(objects: T[]) => {
	if (!objects.length) {
		throw Error("At least one argument should be provided");
	}
	const genType = arrayConvert(objects[0]);
	type GenType = typeof genType[number];

	const isGenType = (val: any): val is GenType => {
		if (areNotObjects(objects[0], val)) {
			return typeof objects[0] === typeof val;
		} else if (oneIsNotObject(objects[0], val)) {
			return false;
		}
		return (
			val && Object.keys(objects[0] as any).every(key => isKeyDefined(val, key))
		);
	};

	const coercion = (val: any): GenType => {
		if (areNotObjects(objects[0], val)) {
			return val as GenType;
		} else if (oneIsNotObject(objects[0], val)) {
			return val;
		}
		Object.keys(val)
			.filter(key => !isKeyDefined(objects[0], key))
			.forEach(key => delete val[key]);
		Object.keys(objects[0] as Object)
			.filter(key => !isKeyDefined(val, key))
			.forEach(key => (val[key] = undefined));
		return val;
	};

	return {
		coercion,
		isGenType,
		objects: objects as GenType[]
	};
};
