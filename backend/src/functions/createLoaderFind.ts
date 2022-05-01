import { ModelProps } from "@ev-postgres/model-2/lib/types/Model";
import { ToArray } from "@ev-postgres/model-2/lib/types/ToArray";
import { Knex } from "knex";
import { Filter } from "../@types/Filter";
import { WithPaginationArgs } from "./withPagination";

export interface CreateLoaderFindProps<Props, PropsPrimary, Args> {
  Model: ModelProps<Props, PropsPrimary>;
  database: Knex;
  allArgs: readonly Args[];
}

export const createLoaderFind = async <
  Props,
  PropsPrimary,
  Args extends WithPaginationArgs<PropsFilter>,
  PropsFilter extends Filter<Equals, Includes, Likes> = Args["filter"],
  Equals = PropsFilter["equals"],
  Likes = PropsFilter["likes"],
  Includes = PropsFilter["includes"]
>({
  Model,
  database,
  allArgs,
}: CreateLoaderFindProps<Props, PropsPrimary, Args>): Promise<Props[][]> => {
  const hashes = new Map(
    allArgs.map((arg) => [JSON.stringify(arg), arg] as const)
  );

  const items = new Map<string, Props[]>();

  for (const hash of hashes.keys()) {
    const args = hashes.get(hash);

    if (args) {
      const rows = await Model.find({
        database,
        filter: {
          $eq: args.filter.equals,
          $in: args.filter.includes as unknown as ToArray<Partial<Props>>,
          $like: args.filter.likes,
        },
      });

      items.set(hash, rows);
    }
  }

  return Array.from(hashes.keys()).map((hash) => items.get(hash) || []);
};
