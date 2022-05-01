import { resolveAll } from "../../functions/resolveAll";
import { resolver } from "../../functions/resolver";
import { validation } from "../../functions/validation";
import { pollsArgs, PollsArgs } from "../../validations/Query/polls";
import { UserFields } from "../../typeDefs/types/User";
import { PollFields } from "../../typeDefs/types/Poll";

export const polls = resolver<UserFields, PollFields[], PollsArgs>(
  validation(pollsArgs),
  resolver(async (source, args, ctx) =>
    resolveAll({
      find: ctx.loaders.Poll.find,
      args,
      overrides: {
        filter: {
          equals: {
            creatorAddress: source.address,
          },
        },
      },
    })
  )
);
