/**
 * Any valid JSON value.
 */
export type Value = null | number | string | boolean | readonly Value[] | object;

type Schema = object;

type SConst<T extends Value> = Readonly<{ const: T }>;
type SEnum<T extends Value> = Readonly<{ enum: readonly T[] }>;

type SNull = Readonly<{ type: "null" }>;
type SNumber = Readonly<{ type: "number" }>;
type SInteger = Readonly<{ type: "integer" }>;
type SString = Readonly<{ type: "string" }>;
type SBoolean = Readonly<{ type: "boolean" }>;

type SArray<I extends Schema, A extends Schema | boolean | undefined> = Readonly<{
  type: "array";
  items?: I | readonly I[];
  additionalItems?: A;
}>;

type SObject<
  P extends Readonly<{ [K in string]?: Schema }>,
  R extends string,
  A extends Schema | boolean | undefined
> = Readonly<{
  type: "object";
  properties?: P;
  required?: readonly R[];
  additionalProperties?: A;
}>;

type SOneOf<S extends Schema> = Readonly<{ oneOf: readonly S[] }>;
type SAllOf<S extends Schema> = Readonly<{ allOf: readonly S[] }>;

/**
 * Derives the type of data that the given JSON schema describes.
 */
export type TypeOfSchema<S extends Schema> = TypeOfSchemaInternal<S>;

// prettier-ignore
type TypeOfSchemaInternal<S extends Schema | undefined> =
    S extends SOneOf<infer S> ? TypeOfSOneOf<S>
  : S extends SAllOf<infer S> ? TypeOfSAllOf<S>
  : TypeOfSchemaInternalSub<S>;

type TypeOfSOneOf<S extends Schema> = TypeOfSchemaInternalSub<S>;

type TypeOfSAllOf<S extends Schema> = UnionToIntersection<TypeOfSchemaInternalSub<S>>;

// prettier-ignore
type TypeOfSchemaInternalSub<S extends Schema | undefined> =
    S extends SConst<infer T> ? T
  : S extends SEnum<infer T> ? T
  : S extends SNull ? null
  : S extends SNumber ? number
  : S extends SInteger ? number
  : S extends SString ? string
  : S extends SBoolean ? boolean
  : S extends SArray<infer I, infer A> ? TypeOfSArray<I, A>
  : S extends SObject<infer P, infer R, infer A> ? TypeOfSObject<P, R, A>
  : Value;

// prettier-ignore
type TypeOfSArray<I extends Schema, A extends Schema | boolean | undefined> =
  Array<
    | TypeOfSchemaInternal<I>
    | (
        [A] extends [Schema] ? TypeOfSchemaInternal<A>
      : [A] extends [true] ? Value
      : never
    )
  >;

// prettier-ignore
type TypeOfSObject<
  P extends Readonly<{ [K in string]?: Schema }>,
  R extends string,
  A extends Schema | boolean | undefined
> =
  & { [K in ElimString<R>]: TypeOfSchemaInternal<P[K]> }
  & { [K in Exclude<ElimString<keyof P>, ElimString<R>>]?: TypeOfSchemaInternal<P[K]> }
  & (
      [A] extends [Schema] ? { [K in string]?: TypeOfSchemaInternal<A> }
    : [A] extends [true] ? { [K in string]?: Value }
    : unknown
  );

// prettier-ignore
type UnionToIntersection<U> =
  (U extends unknown ? (x: U) => never : never) extends (x: infer I) => never ? I : never;

type ElimString<T> = string extends T ? never : T;
