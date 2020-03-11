# Typify-Gen

Generates dynamic types in TypeScript

`npm i typify-gen --save`

```typescript
const MyArray: <any extends Object>[] = [...];

const { objects, isGenType, genTypeCoercion, genTypeKeys } = typifyGen(MyArray);

const MyArrayTyped: GenType[] = objects;

// MyArray has been typed using the union of properties given by the objects in the array
```

# API

```typescript
objects : GenType[]

isGenType : (object: Object) => object is GenType

genTypeCoercion: (object: Object) => GenType

genTypeKeys: string[]
```
