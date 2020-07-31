## Resume

Generates dynamic types in TypeScript

`npm i typify-gen --save`

```typescript
const myArray: <any extends object>[] = [...];

const { objects } = typifyGen(MyArray);

const myArrayTyped = objects;

// myArray has been typed using the union
// of properties given by the objects in the array
```

## API

```typescript
objects : GenType[]

isGenType : (val: object) => object is GenType

isGenTypeInherited: (val: object) => boolean

genTypeCoercion: (val: object) => GenType

genTypeKeys: string[]
```
