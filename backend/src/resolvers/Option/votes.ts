import { resolveAll } from "../../functions/resolveAll";
import { resolver } from "../../functions/resolver";
import { validation } from "../../functions/validation";
import { votesArgs, VotesArgs } from "../../validations/Query/votes";
import { OptionFields } from "../../typeDefs/types/Option";
import { VoteFields } from "../../typeDefs/types/Vote";

export const votes = resolver<OptionFields, VoteFields[], VotesArgs>(
  validation(votesArgs),
  resolver(async (source, args, ctx) =>
    resolveAll({
      find: ctx.loaders.Vote.find,
      args,
      overrides: {
        filter: {
          equals: {
            pollId: source.pollId,
            optionId: source.optionId,
          },
        },
      },
    })
  )
);
