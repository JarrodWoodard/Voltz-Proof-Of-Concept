import { ModelProps } from "@ev-postgres/model-2/lib/types/Model";
import { ToArray } from "@ev-postgres/model-2/lib/types/ToArray";
import { Knex } from "knex";
import { Filter } from "../@types/Filter";
import { WithPaginationArgs } from "./withPagination";

export interface CreateLoaderCountProps<Props, PropsPrimary, Args> {
  Model: ModelProps<Props, PropsPrimary>;
  database: Knex;
  allArgs: readonly Args[];
}

export const createLoaderCount = async <
  Props,
  PropsPrimary,
  Args extends Pick<WithPaginationArgs<PropsFilter>, "filter">,
  PropsFilter extends Filter<Equals, Includes, Likes> = Args["filter"],
  Equals = PropsFilter["equals"],
  Likes = PropsFilter["likes"],
  Includes = PropsFilter["includes"]
>({
  Model,
  database,
  allArgs,
}: CreateLoaderCountProps<Props, PropsPrimary, Args>): Promise<number[]> => {
  const hashes = new Map(
    allArgs.map((arg) => [JSON.stringify(arg), arg] as const)
  );

  const counts = new Map<string, number>();

  for (const hash of hashes.keys()) {
    const args = hashes.get(hash);

    if (args) {
      const totalCount = await Model.count({
        database,
        filter: {
          $eq: args.filter.equals,
          $in: args.filter.includes as unknown as ToArray<Partial<Props>>,
          $like: args.filter.likes,
        },
      });

      counts.set(hash, totalCount);
    }
  }

  return Array.from(hashes.keys()).map((hash) => counts.get(hash) || 0);
};
