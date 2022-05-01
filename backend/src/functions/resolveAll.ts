import DataLoader from "dataloader";
import deepmerge from "deepmerge";
import { WithPaginationArgs } from "./withPagination";

export interface ResolveAllProps<
  Props,
  Args extends Pick<WithPaginationArgs<Filter>, "filter">,
  Filter = Args["filter"]
> {
  find: DataLoader<Args, Props[]>;
  args: Args;
  overrides?: { filter?: { equals?: Partial<Props> } };
}

export const resolveAll = async <
  Props,
  Args extends Pick<WithPaginationArgs<Filter>, "filter">,
  Filter = Args["filter"]
>({
  find,
  args,
  overrides = {},
}: ResolveAllProps<Props, Args>) => {
  const {
    filter: { ...filter },
  } = args;

  const items = await find.load(
    deepmerge(
      {
        filter,
        pagination: {},
        sort: [],
      },
      overrides
    ) as any
  );

  return items;
};
