# @susisu/type-of-schema
**Experimental!**

Derives TypeScript type from [JSON Schema](https://json-schema.org/)

## Installation
``` shell
npm i @susisu/type-of-schema
# or
yarn add @susisu/type-of-schema
```

## Usage
``` typescript
import { TypeOfSchema } from "@susisu/type-of-schema";

const schema = {
  type      : "object",
  properties: {
    "a": { type: "number" },
    "b": { type: "string" },
  },
  required: ["b"],
} as const;

// T = { a?: number, b: string }
type T = TypeOfSchema<typeof schema>;
```

Do not forget `as const` for the schema declaration so that its type contains full information of the schema.

## Supported Schemas
- `const`
- `enum`
- `null`
- `number` / `integer`
- `string`
- `boolean`
- `array` (`items`) 
- `object` (`properties` and `required`)
- `oneOf`
- `allOf`

## Limitations
For JSON Schema object types `S` and `T`, `S extends T` does not always imply `TypeOfSchema<S> extends TypeOfSchema<T>`. In other words, there are cases where derived types are inconsistent with the actual schemas. This can be observed when `required` and upcasting are used together:

``` typescript
const schema = {
  type    : "object",
  required: ["a"],
} as const;

const schema2: {
  type    : "object",
  required: ("a" | "b")[],
} = schema;

// T = { a: Value, b: Value } where Value is the type of any JSON value
// while the schema does not require property "b"
type T = TypeOfSchema<typeof schema2>;
```

To avoid this, use always the original type of schema object, and be careful with upcasting.

## License
[MIT License](http://opensource.org/licenses/mit-license.php)

## Author
Susisu ([GitHub](https://github.com/susisu), [Twitter](https://twitter.com/susisu2413))
