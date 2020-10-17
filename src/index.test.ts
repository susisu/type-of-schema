import { TypeOfSchema, Value } from ".";

declare function assert<T extends true>(): T;

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false;

type NormalizeObject<T> = T extends unknown ? { [K in keyof T]: T[K] } : never;

{
  const schema = {} as const;
  type Expected = Value;
  type Actual = TypeOfSchema<typeof schema>;
  assert<Equal<Actual, Expected>>();
}

{
  const schema = { const: 42 } as const;
  type Expected = 42;
  type Actual = TypeOfSchema<typeof schema>;
  assert<Equal<Actual, Expected>>();
}

{
  const schema = { enum: [42, "foo"] } as const;
  type Expected = 42 | "foo";
  type Actual = TypeOfSchema<typeof schema>;
  assert<Equal<Actual, Expected>>();
}

{
  const schema = { type: "null" } as const;
  type Expected = null;
  type Actual = TypeOfSchema<typeof schema>;
  assert<Equal<Actual, Expected>>();
}

{
  const schema = {
    type: "number",
    minimum: 0,
    maximum: 10,
  } as const;
  type Expected = number;
  type Actual = TypeOfSchema<typeof schema>;
  assert<Equal<Actual, Expected>>();
}

{
  const schema = {
    type: "integer",
    minimum: 0,
    maximum: 10,
  } as const;
  type Expected = number;
  type Actual = TypeOfSchema<typeof schema>;
  assert<Equal<Actual, Expected>>();
}

{
  const schema = {
    type: "string",
    minLength: 8,
    maxLength: 16,
  } as const;
  type Expected = string;
  type Actual = TypeOfSchema<typeof schema>;
  assert<Equal<Actual, Expected>>();
}

{
  const schema = { type: "boolean" } as const;
  type Expected = boolean;
  type Actual = TypeOfSchema<typeof schema>;
  assert<Equal<Actual, Expected>>();
}

{
  const schema = { type: "array" } as const;
  type Expected = Value[];
  type Actual = TypeOfSchema<typeof schema>;
  assert<Equal<Actual, Expected>>();
}

{
  const schema = {
    type: "array",
    items: { type: "number" },
  } as const;
  type Expected = number[];
  type Actual = TypeOfSchema<typeof schema>;
  assert<Equal<Actual, Expected>>();
}

{
  const schema = {
    type: "array",
    items: [{ type: "number" }, { type: "string" }],
  } as const;
  type Expected = Array<number | string>;
  type Actual = TypeOfSchema<typeof schema>;
  assert<Equal<Actual, Expected>>();
}

{
  const schema = {
    type: "array",
    items: { type: "number" },
    additionalItems: true,
  } as const;
  type Expected = Array<number | Value>;
  type Actual = TypeOfSchema<typeof schema>;
  assert<Equal<Actual, Expected>>();
}

{
  const schema = {
    type: "array",
    items: { type: "number" },
    additionalItems: false,
  } as const;
  type Expected = number[];
  type Actual = TypeOfSchema<typeof schema>;
  assert<Equal<Actual, Expected>>();
}

{
  const schema = {
    type: "array",
    items: { type: "number" },
    additionalItems: { type: "string" },
  } as const;
  type Expected = Array<number | string>;
  type Actual = TypeOfSchema<typeof schema>;
  assert<Equal<Actual, Expected>>();
}

{
  const schema = { type: "object" } as const;
  type Expected = {};
  type Actual = TypeOfSchema<typeof schema>;
  assert<Equal<NormalizeObject<Actual>, Expected>>();
}

{
  const schema = {
    type: "object",
    required: ["a"],
  } as const;
  type Expected = { a: Value };
  type Actual = TypeOfSchema<typeof schema>;
  assert<Equal<NormalizeObject<Actual>, Expected>>();
}
{
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
}

{
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
}

{
  const schema = {
    type: "object",
    additionalProperties: true,
  } as const;
  type Expected = { [K in string]?: Value };
  type Actual = TypeOfSchema<typeof schema>;
  assert<Equal<NormalizeObject<Actual>, Expected>>();
}

{
  const schema = {
    type: "object",
    additionalProperties: false,
  } as const;
  type Expected = {};
  type Actual = TypeOfSchema<typeof schema>;
  assert<Equal<NormalizeObject<Actual>, Expected>>();
}

{
  const schema = {
    type: "object",
    additionalProperties: { type: "string" },
  } as const;
  type Expected = { [K in string]?: string };
  type Actual = TypeOfSchema<typeof schema>;
  assert<Equal<NormalizeObject<Actual>, Expected>>();
}

{
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
  } & { [K in string]?: string };
  type Actual = TypeOfSchema<typeof schema>;
  assert<Equal<NormalizeObject<Actual>, NormalizeObject<Expected>>>();
}

{
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
}

{
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
}
