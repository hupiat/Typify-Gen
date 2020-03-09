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
		const other = objects[0];
		return (
			other instanceof object &&
			Object.keys(object).every(key => !!(other as any)[key])
		);
	}

	return {
		objects: objects as GenType[],
		isGenType: isGenType
	};
}
