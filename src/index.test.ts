import { TypeOfSchema } from ".";

type Equal<T, U> = [T] extends [U] ? ([U] extends [T] ? true : false) : false;
type Assert<T extends true> = T;
type Value = null | number | string | boolean | readonly Value[] | {};


const emptySchema = {} as const;

export type AssertEmpty = Assert<Equal<TypeOfSchema<typeof emptySchema>, Value>>;


const constSchema = {
  const: 42,
} as const;

export type AssertConst = Assert<Equal<TypeOfSchema<typeof constSchema>, 42>>;

const enumSchema = {
  enum: [
    42,
    "foo",
  ],
} as const;

export type AssertEnum = Assert<Equal<TypeOfSchema<typeof enumSchema>, 42 | "foo">>;


const nullSchema = {
  type: "null",
} as const;

export type AssertNull = Assert<Equal<TypeOfSchema<typeof nullSchema>, null>>;

const numberSchema = {
  type   : "number",
  minimum: 0,
  maximum: 10,
} as const;

export type AssertNumber = Assert<Equal<TypeOfSchema<typeof numberSchema>, number>>;

const integerSchema = {
  type   : "integer",
  minimum: 0,
  maximum: 10,
} as const;

export type AssertInteger = Assert<Equal<TypeOfSchema<typeof integerSchema>, number>>;

const stringSchema = {
  type     : "string",
  minLength: 8,
  maxLength: 16,
} as const;

export type AssertString = Assert<Equal<TypeOfSchema<typeof stringSchema>, string>>;

const booleanSchema = {
  type: "boolean",
} as const;

export type AssertBoolean = Assert<Equal<TypeOfSchema<typeof booleanSchema>, boolean>>;


const arraySchema1 = {
  type: "array",
} as const;

export type AssertArray1 = Assert<Equal<TypeOfSchema<typeof arraySchema1>, Value[]>>;

const arraySchema2 = {
  type : "array",
  items: { type: "number" },
} as const;

export type AssertArray2 = Assert<Equal<TypeOfSchema<typeof arraySchema2>, number[]>>;

const arraySchema3 = {
  type : "array",
  items: [
    { type: "number" },
    { type: "string" },
  ],
} as const;

export type AssertArray3 = Assert<Equal<TypeOfSchema<typeof arraySchema3>, Array<number | string>>>;

const objectSchema1 = {
  type: "object",
} as const;

type Object1 = TypeOfSchema<typeof objectSchema1>;
export type AssertObject1 = Assert<Equal<Object1, {}>>;
export type AssertObject1Prop = Assert<Equal<keyof Object1, never>>;

const objectSchema2 = {
  type    : "object",
  required: ["a"],
} as const;

type Object2 = TypeOfSchema<typeof objectSchema2>;
export type AssertObject2 = Assert<Equal<Object2, {
  a: Value,
}>>;
export type AssertObject2Prop = Assert<Equal<Object2["a"], Value>>;

const objectSchema3 = {
  type      : "object",
  properties: {
    "a": { type: "number" },
    "b": { type: "string" },
  },
} as const;

type Object3 = TypeOfSchema<typeof objectSchema3>;
export type AssertObject3 = Assert<Equal<Object3, {
  a?: number,
  b?: string,
}>>;
export type AssertObject3Prop1 = Assert<Equal<Object3["a"], number | undefined>>;
export type AssertObject3Prop2 = Assert<Equal<Object3["b"], string | undefined>>;

const objectSchema4 = {
  type      : "object",
  properties: {
    "a": { type: "number" },
    "b": { type: "string" },
  },
  required: ["b"],
} as const;

type Object4 = TypeOfSchema<typeof objectSchema4>;
export type AssertObject4 = Assert<Equal<Object4, {
  a?: number,
  b: string,
}>>;
export type AssertObject4Prop1 = Assert<Equal<Object4["a"], number | undefined>>;
export type AssertObject4Prop2 = Assert<Equal<Object4["b"], string>>;

const objectSchema5 = {
  type                : "object",
  additionalProperties: true,
} as const;

type Object5 = TypeOfSchema<typeof objectSchema5>;
export type AssertObject5 = Assert<Equal<Object5, {
  [K in string]?: Value
}>>;
export type AssertObject5Prop = Assert<Equal<Object5["a"], Value | undefined>>;

const objectSchema6 = {
  type                : "object",
  additionalProperties: false,
} as const;

type Object6 = TypeOfSchema<typeof objectSchema6>;
export type AssertObject6 = Assert<Equal<Object6, {}>>;
export type AssertObject6Prop = Assert<Equal<keyof Object6, never>>;

const objectSchema7 = {
  type                : "object",
  additionalProperties: { type: "string" },
} as const;

type Object7 = TypeOfSchema<typeof objectSchema7>;
export type AssertObject7 = Assert<Equal<Object7, {
  [K in string]?: string
}>>;
export type AssertObject7Prop = Assert<Equal<Object7["a"], string | undefined>>;

const objectSchema8 = {
  type      : "object",
  properties: {
    "a": { type: "number" },
    "b": { type: "string" },
  },
  required            : ["b"],
  additionalProperties: { type: "string" },
} as const;

type Object8 = TypeOfSchema<typeof objectSchema8>;
export type AssertObject8 = Assert<Equal<Object8, {
  a?: number,
  b: string,
} & {
  [K in string]?: string
}>>;
export type AssertObject8Prop1 = Assert<Equal<Object8["a"], number | undefined>>;
export type AssertObject8Prop2 = Assert<Equal<Object8["b"], string>>;
export type AssertObject8Prop3 = Assert<Equal<Object8["c"], string | undefined>>;


const oneOfSchema = {
  oneOf: [
    {
      type      : "object",
      properties: {
        a: { type: "number" },
      },
      required: ["a"],
    },
    {
      type      : "object",
      properties: {
        b: { type: "string" },
      },
      required: ["b"],
    },
  ],
} as const;

export type AssertOneOf = Assert<Equal<TypeOfSchema<typeof oneOfSchema>, {
  a: number,
} | {
  b: string,
}>>;

const allOfSchema = {
  allOf: [
    {
      type      : "object",
      properties: {
        a: { type: "number" },
      },
      required: ["a"],
    },
    {
      type      : "object",
      properties: {
        b: { type: "string" },
      },
      required: ["b"],
    },
  ],
} as const;

export type AssertAllOf = Assert<Equal<TypeOfSchema<typeof allOfSchema>, {
  a: number,
} & {
  b: string,
}>>;
