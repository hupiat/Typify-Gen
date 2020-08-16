## Resume

Generates dynamic types in TypeScript

`npm i typify-gen --save`

```typescript
const myArray: <any extends object>[] = [...];

const { objects } = typifyGen(myArray);

const myArrayTyped = objects;

// myArray has been typed using the union
// of properties given by the objects in the array

// if you set up the intersection generation, you will
// be warned that your optional properties will still be displayed
// by autocompletion due to TypeScript's behaviour, which cannot
// infer the dynamic generation
```

## API

```typescript
typifyGen<T>(objects: T, logic?: "union" | "intersection") => {

  objects : GenType[]

  isGenType : (val: object) => object is GenType

  isGenTypeInherited : (val: object) => boolean

  genTypeCoercion : (val: object, byDefault?: object) => GenType

  genTypeKeys : string[]

  genTypeOptionalKeys : string[]
}
```
