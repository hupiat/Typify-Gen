function arrayConvert<T>(...args: T[]): T[] {
	return args;
}

export function typifyGen<T>(...objects: T[]) {
	if (!objects.length) {
		throw Error("At least one argument should be provided");
	}
	const genType = arrayConvert(objects[0]);
	type GenType = typeof genType[number];

	function isGenType(object: any): object is GenType {
		if (!(objects[0] instanceof object) && !(object instanceof object)) {
			return typeof objects[0] === typeof object;
		} else if (!(objects[0] instanceof object) || !(object instanceof object)) {
			return false;
		}
		return Object.keys(object).every(key => !!(objects[0] as any)[key]);
	}

	return {
		objects: objects as GenType[],
		isGenType: isGenType
	};
}
