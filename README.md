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

## License
[MIT License](http://opensource.org/licenses/mit-license.php)

## Author
Susisu ([GitHub](https://github.com/susisu), [Twitter](https://twitter.com/susisu2413))
