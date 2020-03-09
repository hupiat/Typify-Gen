# Typify-Gen

Generates dynamic types in TypeScript

`npm i typify-gen --save`

```typescript
const MyArray: any = [...];

const MyArrayTyped = typifyGen(MyArray);

// MyArray has been typed using the union of properties given by the objects in the array

// Supplying an array of primitives will have no effect
```
