import DataLoader from "dataloader";
import deepmerge from "deepmerge";
import { WithPaginationArgs } from "./withPagination";

export interface ResolveWithPaginationProps<
  Props,
  Args extends WithPaginationArgs<Filter>,
  Filter = Args["filter"]
> {
  count: DataLoader<Pick<Args, "filter">, number>;
  find: DataLoader<Args, Props[]>;
  args: Args;
  overrides?: { filter?: { equals?: Partial<Props> } };
}

export const resolveWithPagination = async <
  Props,
  Args extends WithPaginationArgs<Filter>,
  Filter = Args["filter"]
>({
  count,
  find,
  args,
  overrides = {},
}: ResolveWithPaginationProps<Props, Args>) => {
  const {
    filter: { ...filter },
    pagination: { ...pagination },
  } = args;

  return {
    totalCount: async () => {
      const totalCount = await count.load(
        deepmerge({ filter }, overrides) as any
      );

      return totalCount;
    },
    items: async () => {
      const items = await find.load(
        deepmerge(
          {
            filter,
            pagination,
          },
          overrides
        ) as any
      );

      return items;
    },
  };
};
