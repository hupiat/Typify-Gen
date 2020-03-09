export declare const typifyGen: <T extends Object>(objects: T[]) => {
    coercion: (val: any) => T;
    isGenType: (val: any) => val is T;
    objects: T[];
};
