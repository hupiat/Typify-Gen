export declare const typifyGen: <T extends Object>(objects: T[]) => {
    coercion: (val: Object) => T;
    isGenType: (val: Object) => val is T;
    objects: T[];
};
