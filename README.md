# @susisu/type-of-schema

[![CI](https://github.com/susisu/type-of-schema/workflows/CI/badge.svg)](https://github.com/susisu/type-of-schema/actions?query=workflow%3ACI)

Derives TypeScript type from [JSON Schema](https://json-schema.org/)

## Installation

``` shell
# npm
npm i @susisu/type-of-schema
# yarn
yarn add @susisu/type-of-schema
# pnpm
pnpm add @susisu/type-of-schema
```

## Usage

``` typescript
import type { TypeOfSchema } from "@susisu/type-of-schema";

const schema = {
  type: "object",
  properties: {
    "a": { type: "number" },
    "b": { type: "string" },
  },
  required: ["b"],
} as const;

// T = { a?: number; b: string }
type T = TypeOfSchema<typeof schema>;
```

Do not forget `as const` in the schema declaration. Without it, you will not get the full information of the schema.

## Supported Schemas

- `const`
- `enum`
- `null`
- `number` / `integer`
- `string`
- `boolean`
- `array` (`items` and `additionalItems`) 
- `object` (`properties`, `required`, and `additionalProperties`)
- `oneOf`
- `allOf`

## Limitations

For JSON Schema object types `S` and `T`, `S extends T` does not imply `TypeOfSchema<S> extends TypeOfSchema<T>`. In other words, a type derived from a schema can be inconsistent with what the schema actually describes. This can be observed, for example, when upcasting a schema containing `required`:

``` typescript
const schema1 = {
  type: "object",
  required: ["a"],
} as const;

// T1 = { a: Value }
type T1 = TypeOfSchema<typeof schema1>;

const schema2: {
  type: "object";
  required: ("a" | "b")[];
} = schema1;

// T2 = { a: Value; b: Value }
// but b is actually not required
type T2 = TypeOfSchema<typeof schema2>;
```

To avoid this, do always pass the original schema to `TypeOfSchema`.

## License

[MIT License](http://opensource.org/licenses/mit-license.php)

## Author

Susisu ([GitHub](https://github.com/susisu), [Twitter](https://twitter.com/susisu2413))
