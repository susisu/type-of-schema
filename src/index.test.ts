import type { TypeOfSchema, Value } from ".";

declare function describe(name: string, body: () => void): void;
declare function it(name: string, body: () => void): void;
declare function assert<T extends true>(): T;

type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;

type NormalizeObject<T> = T extends unknown ? { [K in keyof T]: T[K] } : never;

describe("empty schema", () => {
  it("returns any value type", () => {
    const schema = {} as const;
    type Expected = Value;
    type Actual = TypeOfSchema<typeof schema>;
    assert<Equal<Actual, Expected>>();
  });
});

describe("const", () => {
  it("returns a constant value type", () => {
    const schema = { const: 42 } as const;
    type Expected = 42;
    type Actual = TypeOfSchema<typeof schema>;
    assert<Equal<Actual, Expected>>();
  });
});

describe("enum", () => {
  it("returns a union type of enum members", () => {
    const schema = { enum: [42, "foo"] } as const;
    type Expected = 42 | "foo";
    type Actual = TypeOfSchema<typeof schema>;
    assert<Equal<Actual, Expected>>();
  });
});

describe("null", () => {
  it("returns the null type", () => {
    const schema = { type: "null" } as const;
    type Expected = null;
    type Actual = TypeOfSchema<typeof schema>;
    assert<Equal<Actual, Expected>>();
  });
});

describe("number", () => {
  it("returns the number type", () => {
    // NOTE: Constaints that cannot be represented in types, such as minimum and maximum, are ignored.
    const schema = {
      type: "number",
      minimum: 0,
      maximum: 10,
    } as const;
    type Expected = number;
    type Actual = TypeOfSchema<typeof schema>;
    assert<Equal<Actual, Expected>>();
  });
});

describe("integer", () => {
  it("returns the number type", () => {
    // NOTE: The constraint that the value is an integer is ignored, as it cannot be represented in types.
    const schema = {
      type: "integer",
      minimum: 0,
      maximum: 10,
    } as const;
    type Expected = number;
    type Actual = TypeOfSchema<typeof schema>;
    assert<Equal<Actual, Expected>>();
  });
});

describe("string", () => {
  it("returns the string type", () => {
    // NOTE: Constaints that cannot be represented in types, such as minLength and maxLength, are ignored.
    const schema = {
      type: "string",
      minLength: 8,
      maxLength: 16,
    } as const;
    type Expected = string;
    type Actual = TypeOfSchema<typeof schema>;
    assert<Equal<Actual, Expected>>();
  });
});

describe("boolean", () => {
  it("returns the boolean type", () => {
    const schema = { type: "boolean" } as const;
    type Expected = boolean;
    type Actual = TypeOfSchema<typeof schema>;
    assert<Equal<Actual, Expected>>();
  });
});

describe("array", () => {
  it("returns an array type of any values if no item is specified", () => {
    const schema = { type: "array" } as const;
    type Expected = Value[];
    type Actual = TypeOfSchema<typeof schema>;
    assert<Equal<Actual, Expected>>();
  });

  it("returns an array type of typed values if an item is specified", () => {
    const schema = {
      type: "array",
      items: { type: "number" },
    } as const;
    type Expected = number[];
    type Actual = TypeOfSchema<typeof schema>;
    assert<Equal<Actual, Expected>>();
  });

  it("returns an array type of union typed values if multiple items are specified", () => {
    const schema = {
      type: "array",
      items: [{ type: "number" }, { type: "string" }],
    } as const;
    type Expected = Array<number | string>;
    type Actual = TypeOfSchema<typeof schema>;
    assert<Equal<Actual, Expected>>();
  });

  it("returns an array type that allows any values if additionalItems is set to true", () => {
    const schema = {
      type: "array",
      items: { type: "number" },
      additionalItems: true,
    } as const;
    type Expected = Array<number | Value>;
    type Actual = TypeOfSchema<typeof schema>;
    assert<Equal<Actual, Expected>>();
  });

  it("returns an array type that disallows any values if additionalItems is set to false", () => {
    const schema = {
      type: "array",
      items: { type: "number" },
      additionalItems: false,
    } as const;
    type Expected = number[];
    type Actual = TypeOfSchema<typeof schema>;
    assert<Equal<Actual, Expected>>();
  });

  it("returns an array type that allows additional values if additionalItems is specified with a schema", () => {
    const schema = {
      type: "array",
      items: { type: "number" },
      additionalItems: { type: "string" },
    } as const;
    type Expected = Array<number | string>;
    type Actual = TypeOfSchema<typeof schema>;
    assert<Equal<Actual, Expected>>();
  });
});

describe("object", () => {
  it("returns an empty object type if nothing else is specified", () => {
    const schema = { type: "object" } as const;
    type Expected = {};
    type Actual = TypeOfSchema<typeof schema>;
    assert<Equal<NormalizeObject<Actual>, Expected>>();
  });

  it("returns an object type with any typed properties if required is specified without properties", () => {
    const schema = {
      type: "object",
      required: ["a"],
    } as const;
    type Expected = { a: Value };
    type Actual = TypeOfSchema<typeof schema>;
    assert<Equal<NormalizeObject<Actual>, Expected>>();
  });

  it("returns an object type with optional typed properties if properties are specified without required", () => {
    const schema = {
      type: "object",
      properties: {
        a: { type: "number" },
        b: { type: "string" },
      },
    } as const;
    type Expected = {
      a?: number;
      b?: string;
    };
    type Actual = TypeOfSchema<typeof schema>;
    assert<Equal<NormalizeObject<Actual>, Expected>>();
  });

  it("returns an object type with required typed properties if properties and required are specified", () => {
    const schema = {
      type: "object",
      properties: {
        a: { type: "number" },
        b: { type: "string" },
      },
      required: ["b"],
    } as const;
    type Expected = {
      a?: number;
      b: string;
    };
    type Actual = TypeOfSchema<typeof schema>;
    assert<Equal<NormalizeObject<Actual>, Expected>>();
  });

  it("returns an object type with an any typed index signature if additionalProperties is set to true", () => {
    const schema = {
      type: "object",
      additionalProperties: true,
    } as const;
    type Expected = { [K in string]?: Value };
    type Actual = TypeOfSchema<typeof schema>;
    assert<Equal<NormalizeObject<Actual>, Expected>>();
  });

  it("returns an empty object type if additionalProperties is set to false", () => {
    const schema = {
      type: "object",
      additionalProperties: false,
    } as const;
    type Expected = {};
    type Actual = TypeOfSchema<typeof schema>;
    assert<Equal<NormalizeObject<Actual>, Expected>>();
  });

  it("returns an object type with a typed index signature if additionalProperties is specified with a schema", () => {
    const schema = {
      type: "object",
      additionalProperties: { type: "string" },
    } as const;
    type Expected = { [K in string]?: string };
    type Actual = TypeOfSchema<typeof schema>;
    assert<Equal<NormalizeObject<Actual>, Expected>>();
  });

  it("returns an intersection type of objects if both properties and additionalProperties are specified", () => {
    const schema = {
      type: "object",
      properties: {
        a: { type: "number" },
        b: { type: "string" },
      },
      required: ["b"],
      additionalProperties: { type: "string" },
    } as const;
    type Expected = {
      a?: number;
      b: string;
    } & {
      [K in string]?: string;
    };
    type Actual = TypeOfSchema<typeof schema>;
    assert<Equal<NormalizeObject<Actual>, NormalizeObject<Expected>>>();
  });
});

describe("oneOf", () => {
  it("returns a union type that accepts any values allowed by one of the schemas", () => {
    const schema = {
      oneOf: [
        {
          type: "object",
          properties: {
            a: { type: "number" },
          },
          required: ["a"],
        },
        {
          type: "object",
          properties: {
            b: { type: "string" },
          },
          required: ["b"],
        },
      ],
    } as const;
    type Expected = { a: number } | { b: string };
    type Actual = TypeOfSchema<typeof schema>;
    assert<Equal<NormalizeObject<Actual>, Expected>>();
  });
});

describe("allOf", () => {
  it("returns an intersection type that accepts any values allowed by all of the schemas", () => {
    const schema = {
      allOf: [
        {
          type: "object",
          properties: {
            a: { type: "number" },
          },
          required: ["a"],
        },
        {
          type: "object",
          properties: {
            b: { type: "string" },
          },
          required: ["b"],
        },
      ],
    } as const;
    type Expected = { a: number } & { b: string };
    type Actual = TypeOfSchema<typeof schema>;
    assert<Equal<NormalizeObject<Actual>, NormalizeObject<Expected>>>();
  });
});
