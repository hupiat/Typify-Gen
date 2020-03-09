export declare const typifyGen: <T extends Object>(objects: T[]) => {
    genTypeCoercion: (val: Object) => T;
    isGenType: (val: Object) => val is T;
    genTypeKeys: string[];
    objects: T[];
};
