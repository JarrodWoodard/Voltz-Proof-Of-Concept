import { resolveWithPagination } from "../../functions/resolveWithPagination";
import { resolver } from "../../functions/resolver";
import { validation } from "../../functions/validation";
import { PollWithPaginationFields } from "../../typeDefs/types/PollWithPagination";
import { QueryFields } from "../../typeDefs/types/Query";
import { pollsArgs, PollsArgs } from "../../validations/Query/polls";

export const polls = resolver<QueryFields, PollWithPaginationFields, PollsArgs>(
  validation(pollsArgs),
  resolver(async (source, args, ctx) =>
    resolveWithPagination({
      count: ctx.loaders.Poll.count,
      find: ctx.loaders.Poll.find,
      args,
    })
  )
);
