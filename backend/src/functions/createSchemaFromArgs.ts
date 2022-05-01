import Joi, { PartialSchemaMap } from "joi";

export type Schema<T, R = Required<T>> = {
  [K in keyof R]?: R[K] extends boolean
    ? Joi.BooleanSchema
    : R[K] extends string
    ? Joi.StringSchema
    : R[K] extends Date
    ? Joi.DateSchema
    : R[K] extends number
    ? Joi.NumberSchema
    : R[K] extends unknown[]
    ? Joi.ArraySchema
    : Joi.ObjectSchema<R[K]>;
};

export const createSchemaFromArgs = <T>(args: Schema<T>) =>
  Joi.object<T>().keys(
    Object.keys(args).reduce(
      (schema, key) => ({ ...schema, [key]: args[key as keyof Schema<T>] }),
      {} as PartialSchemaMap<T>
    )
  );

export const createArraySchemaFromArgs = <T extends readonly unknown[]>(
  args: Schema<NonNullable<T>[0]>
) => Joi.array().items(args);
