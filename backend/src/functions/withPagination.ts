import Joi from "joi";
import { Filter } from "../@types/Filter";
import { Pagination } from "../typeDefs/inputs/Pagination";
import { createSchemaFromArgs, Schema } from "./createSchemaFromArgs";

export interface WithPagination<T> {
  totalCount: () => Promise<number>;
  items: () => Promise<T[]>;
}

export interface WithPaginationArgs<Filter> {
  pagination: Partial<Pagination>;
  filter: Filter;
}

export const createWithPaginationArgs = <
  Args extends WithPaginationArgs<Filter<Equals, Includes, Likes>>,
  Equals = Args["filter"]["equals"],
  Includes = Args["filter"]["includes"],
  Likes = Args["filter"]["likes"]
>(
  args: Schema<Equals>
) =>
  Joi.object()
    .keys({
      pagination: Joi.object()
        .keys({
          limit: Joi.number().integer().min(1).max(100).default(100),
          offset: Joi.number().integer().min(0).default(0),
        })
        .empty(null)
        .default({ limit: 100, offset: 0 }),
      filter: Joi.object()
        .keys({
          equals: createSchemaFromArgs(args),
          likes: createSchemaFromArgs(args),
          includes: createSchemaFromArgs(
            Object.keys(args).reduce(
              (schema, key) => ({
                ...schema,
                [key]:
                  args[key as keyof Equals] &&
                  Joi.array().items(
                    args[key as keyof Equals]?.required() || {}
                  ),
              }),
              {} as Schema<Equals>
            )
          ),
        })
        .empty(null)
        .default({}),
    })
    .required();
