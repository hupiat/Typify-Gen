export declare const typifyGen: <T extends object>(
	objects: T[]
) => {
	genTypeCoercion: (val: object) => T;
	isGenType: (val: object) => val is T;
	genTypeKeys: string[];
	objects: T[];
};
