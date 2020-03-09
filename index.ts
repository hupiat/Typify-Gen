// Hack to get gen type
const arrayConvert = <T>(...args: T[]): T[] => args;

const isKeyDefined = (object: any, key: string) => object[key] !== undefined;

export const typifyGen = <T extends Object>(objects: T[]) => {
	if (!objects.length) {
		throw Error("At least one argument should be provided");
	}

	const genType = arrayConvert(objects[0]);
	type GenType = typeof genType[number];

	// We collect all the keys, optionals or not
	const keys: Set<string> = new Set();
	objects.forEach(obj => Object.keys(obj).forEach(key => keys.add(key)));

	const isGenType = (val: any): val is GenType =>
		!!val && [...keys].every(key => isKeyDefined(val, key));

	const coercion = (val: any): GenType => {
		Object.keys(val)
			.filter(key => !keys.has(key))
			.forEach(key => delete val[key]);

		[...keys]
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
