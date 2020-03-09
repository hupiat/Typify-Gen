export declare function typifyGen<T>(...objects: T[]): {
    objects: T[];
    isGenType: (object: any) => object is T;
};
