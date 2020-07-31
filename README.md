## Resume

Generates dynamic types in TypeScript

`npm i typify-gen --save`

```typescript
const MyArray: <any extends object>[] = [...];

const { objects, isGenType, genTypeCoercion, genTypeKeys } = typifyGen(MyArray);

const MyArrayTyped = objects;

// MyArray has been typed using the union of properties given by the objects in the array
```

## API

```typescript
objects : GenType[]

isGenType : (object: object) => object is GenType

isGenTypeInherited: (val: object) => boolean

genTypeCoercion: (object: object) => GenType

genTypeKeys: string[]
```
