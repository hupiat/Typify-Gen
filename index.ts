function arrayConvert<T>(...args: T[]): T[] {
	return args;
}

export function typifyGen<T>(...objects: T[]) {
	if (!objects.length) {
		throw Error("At least one argument should be provided");
	}
	const dynType = arrayConvert(objects[0]);
	type DynType = typeof dynType[number];

	function isGenType(object: any): object is DynType {
		const other = objects[0];
		return (
			other instanceof object &&
			Object.keys(object).every(key => !!(other as any)[key])
		);
	}

	return {
		objects: objects as DynType[],
		isGenType: isGenType
	};
}
