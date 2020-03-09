function arrayConvert<T>(...args: T[]): T[] {
	return args;
}

export function typifyGen<T>(...objects: T[]) {
	if (!objects.length) {
		throw Error("At least one argument should be provided");
	}
	const dynType = arrayConvert(objects[0]);
	type DynType = typeof dynType[number];
	return objects.map(o => o as DynType);
}
