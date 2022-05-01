import { resolveWithPagination } from "../../functions/resolveWithPagination";
import { resolver } from "../../functions/resolver";
import { validation } from "../../functions/validation";
import { VoteWithPaginationFields } from "../../typeDefs/types/VoteWithPagination";
import { QueryFields } from "../../typeDefs/types/Query";
import { votesArgs, VotesArgs } from "../../validations/Query/votes";

export const votes = resolver<QueryFields, VoteWithPaginationFields, VotesArgs>(
  validation(votesArgs),
  resolver(async (source, args, ctx) =>
    resolveWithPagination({
      count: ctx.loaders.Vote.count,
      find: ctx.loaders.Vote.find,
      args,
    })
  )
);
