type Schema = {};

type Type = null | number | string | boolean | readonly Type[] | { [K in string]?: Type };


type SConst<T extends Type> = Readonly<{
  const: T,
}>;

type SEnum<T extends Type> = Readonly<{
  enum: readonly T[],
}>;


type SNull = Readonly<{
  type: "null",
}>;

type SNumber = Readonly<{
  type: "number",
}>;

type SInteger = Readonly<{
  type: "integer",
}>;

type SString = Readonly<{
  type: "string",
}>;

type SBoolean = Readonly<{
  type: "boolean",
}>;


type SArray<I extends Schema> = Readonly<{
  type: "array",
  items?: I | readonly I[],
}>;

type SObject<P extends Readonly<{ [K in string]: Schema }>, R extends string> = Readonly<{
  type: "object",
  properties?: P,
  required?: readonly R[],
}>;


type SOneOf<S extends Schema> = Readonly<{
  oneOf: readonly S[],
}>;

type SAllOf<S extends Schema> = Readonly<{
  allOf: readonly S[],
}>;

/**
 * Derives the type of data that the given JSON schema describes.
 */
export type TypeOfSchema<S extends Schema> =
    S extends SOneOf<infer S> ? TypeOfSOneOf<S>
  : S extends SAllOf<infer S> ? TypeOfSAllOf<S>
  : TypeOfSchemaSub<S>;

type TypeOfSOneOf<S extends Schema> = TypeOfSchemaSub<S>;

type TypeOfSAllOf<S extends Schema> = UnionToIntersection<TypeOfSchemaSub<S>>;

type UnionToIntersection<U> =
  (U extends unknown ? (x: U) => never : never) extends (x: infer I) => never ? I : never;

type TypeOfSchemaSub<S extends Schema> =
    S extends SConst<infer T> ? T
  : S extends SEnum<infer T> ? T
  : S extends SNull ? null
  : S extends SNumber ? number
  : S extends SInteger ? number
  : S extends SString ? string
  : S extends SBoolean ? boolean
  : S extends SArray<infer I> ? TypeOfSArray<I>
  : S extends SObject<infer P, infer R> ? TypeOfSObject<P, R>
  : Type;

type TypeOfSArray<I extends Schema> = Array<TypeOfSchema<I>>;

type TypeOfSObject<P extends Readonly<{ [K in string]: Schema }>, R extends string> =
  & { [K in ElimString<R>]: TypeOfSchema<P[K]> }
  & { [K in Exclude<ElimString<keyof P>, ElimString<R>>]?: TypeOfSchema<P[K]> };
  // & { [K in string]?: Type };

type ElimString<T> = string extends T ? never : T;
