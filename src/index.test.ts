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

export type AssertObject1 = Assert<Equal<TypeOfSchema<typeof objectSchema1>, {}>>;

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
