import { resolveWithPagination } from "../../functions/resolveWithPagination";
import { resolver } from "../../functions/resolver";
import { validation } from "../../functions/validation";
import { OptionWithPaginationFields } from "../../typeDefs/types/OptionWithPagination";
import { QueryFields } from "../../typeDefs/types/Query";
import { optionsArgs, OptionsArgs } from "../../validations/Query/options";

export const options = resolver<
  QueryFields,
  OptionWithPaginationFields,
  OptionsArgs
>(
  validation(optionsArgs),
  resolver(async (source, args, ctx) =>
    resolveWithPagination({
      count: ctx.loaders.Option.count,
      find: ctx.loaders.Option.find,
      args,
    })
  )
);
