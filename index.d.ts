export declare const typifyGen: <T extends object>(
  objects: T[],
  logic?: "union" | "intersection"
) => {
  genTypeCoercion: (val: object) => T;
  isGenType: (val: object) => val is T;
  isGenTypeInherited: (val: object) => boolean;
  genTypeKeys: string[];
  objects: T[];
};
